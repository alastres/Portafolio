'use client';

import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import type { Locale } from '@/i18n-config';
import type { HomeContent } from '@/components/home/types';
import '@/components/home/home.css';
import './pages.css';
import GlassDefs from './GlassDefs';

export interface ShellProject { slug: string; title: string }

const SECTIONS = ['inicio', 'problemas', 'casos', 'stack', 'contacto'] as const;
/** Sección de la portada -> botón activo (0 inicio, 1 problemas, 2 casos, 3 sobre mí, 4 contacto). */
const NAV_OF_SECTION = [0, 1, 2, 2, 4];

function Ico({ children }: { children: ReactNode }) {
    return <svg viewBox="0 0 24 24" aria-hidden="true">{children}</svg>;
}

/* ------------------------------------------------------------------ Paleta */

interface PalItem { label: string; kind: string; run: () => void }

function Palette({ open, items, c, onClose }: { open: boolean; items: PalItem[]; c: HomeContent; onClose: () => void }) {
    const [q, setQ] = useState('');
    const [sel, setSel] = useState(0);
    const input = useRef<HTMLInputElement>(null);
    const list = useMemo(() => items.filter((x) => !q || x.label.toLowerCase().includes(q.toLowerCase())), [items, q]);

    useEffect(() => {
        if (open) input.current?.focus();
    }, [open]);

    const run = (x?: PalItem) => { if (!x) return; onClose(); x.run(); };

    return (
        <div className={`pal${open ? ' on' : ''}`} role="dialog" aria-modal="true" aria-label={c.ui.search} inert={!open}>
            <input
                ref={input}
                value={q}
                onChange={(e) => { setQ(e.target.value); setSel(0); }}
                onKeyDown={(e) => {
                    if (e.key === 'ArrowDown') { e.preventDefault(); setSel((s) => Math.min(list.length - 1, s + 1)); }
                    if (e.key === 'ArrowUp') { e.preventDefault(); setSel((s) => Math.max(0, s - 1)); }
                    if (e.key === 'Enter') { e.preventDefault(); run(list[sel]); }
                }}
                placeholder={c.ui.searchPlaceholder}
                aria-label={c.ui.search}
                autoComplete="off"
            />
            <ul>
                {list.length ? list.map((x, i) => (
                    <li key={x.kind + x.label}>
                        <button className={i === sel ? 'sel' : ''} onMouseEnter={() => setSel(i)} onClick={() => run(x)}>
                            {x.label}<small>{x.kind}</small>
                        </button>
                    </li>
                )) : <li className="empty">{c.ui.noResults}</li>}
            </ul>
        </div>
    );
}


/* ------------------------------------------------------------------ Shell */

export default function SiteShell({ lang, c, projects, children }: { lang: Locale; c: HomeContent; projects: ShellProject[]; children: ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const { resolvedTheme, setTheme } = useTheme();
    const mounted = useSyncExternalStore(() => () => {}, () => true, () => false);
    const [spy, setSpy] = useState(0);
    const [pal, setPal] = useState(false);
    const [clock, setClock] = useState('');
    const lastFocus = useRef<HTMLElement | null>(null);

    const isHome = /^\/(es|en)\/?$/.test(pathname ?? '');
    const route = (pathname ?? '').replace(/^\/(es|en)/, '');
    const current = isHome ? NAV_OF_SECTION[spy] : route.startsWith('/projects') ? 2 : route.startsWith('/about') ? 3 : route.startsWith('/contact') ? 4 : -1;

    useEffect(() => {
        const tick = () => setClock(new Intl.DateTimeFormat(lang === 'es' ? 'es-ES' : 'en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Madrid' }).format(new Date()));
        tick();
        const id = setInterval(tick, 30000);
        return () => clearInterval(id);
    }, [lang]);

    // Sección visible en la portada
    useEffect(() => {
        if (!isHome) return;
        const io = new IntersectionObserver(
            (es) => es.forEach((e) => { if (e.isIntersecting) setSpy(Math.max(0, SECTIONS.indexOf(e.target.id as (typeof SECTIONS)[number]))); }),
            { rootMargin: '-40% 0px -55% 0px' }
        );
        SECTIONS.forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
        return () => io.disconnect();
    }, [isHome]);

    useEffect(() => {
        document.documentElement.classList.toggle('pf-lock', pal);
        return () => document.documentElement.classList.remove('pf-lock');
    }, [pal]);

    const openPal = useCallback(() => { lastFocus.current = document.activeElement as HTMLElement; setPal(true); }, []);
    const closePal = useCallback(() => { setPal(false); lastFocus.current?.focus?.(); }, []);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setPal((v) => !v); return; }
            if (e.key === 'Escape' && pal) setPal(false);
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [pal]);

    const nav = [
        { key: 'home', label: c.nav.home, anchor: 'inicio', href: `/${lang}`, icon: <Ico><path d="m4 11 8-7 8 7v8a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1z" /></Ico> },
        { key: 'problems', label: c.nav.problems, anchor: 'problemas', href: `/${lang}#problemas`, icon: <Ico><path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2V16h5v-.1c0-.8.4-1.5 1-2A6 6 0 0 0 12 3z" /></Ico> },
        { key: 'cases', label: c.nav.cases, anchor: 'casos', href: `/${lang}/projects`, icon: <Ico><rect x="4" y="4" width="7" height="7" rx="1.5" /><rect x="13" y="4" width="7" height="7" rx="1.5" /><rect x="4" y="13" width="7" height="7" rx="1.5" /><rect x="13" y="13" width="7" height="7" rx="1.5" /></Ico> },
        { key: 'about', label: c.ui.about, href: `/${lang}/about`, icon: <Ico><circle cx="12" cy="8" r="4" /><path d="M4 20c1-4 4-6 8-6s7 2 8 6" /></Ico> },
        { key: 'contact', label: c.nav.contact, anchor: 'contacto', href: `/${lang}/contact`, icon: <Ico><path d="M4 6h16v12H4zM4 7l8 6 8-6" /></Ico> },
    ];

    const go = (n: (typeof nav)[number]) => (e: React.MouseEvent) => {
        if (isHome && n.anchor) {
            e.preventDefault();
            document.getElementById(n.anchor)?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const isLight = mounted && resolvedTheme === 'light';
    const toggleTheme = () => {
        const root = document.documentElement;
        root.classList.add('pf-theming');
        setTheme(isLight ? 'dark' : 'light');
        window.setTimeout(() => root.classList.remove('pf-theming'), 700);
    };
    const other: Locale = lang === 'es' ? 'en' : 'es';
    const otherHref = pathname ? pathname.replace(/^\/(es|en)(?=\/|$)/, `/${other}`) : `/${other}`;
    const [flip, setFlip] = useState(false);
    const switchLang = (e: React.MouseEvent) => {
        e.preventDefault();
        if (flip) return;
        setFlip(true);
        document.documentElement.classList.add('pf-theming');
        window.setTimeout(() => router.push(otherHref), 320);
    };
    const langBtn = (
        <a href={otherHref} hrefLang={other} onClick={switchLang} className={`tgl lang${(lang === 'en') !== flip ? ' b' : ''}`} role="switch" aria-checked={lang === 'en'} aria-label={lang === 'es' ? 'Switch to English' : 'Cambiar a español'}>
            <span className="tl1">ES</span><span className="tl2">EN</span><i className="th" />
        </a>
    );
    const themeBtn = (
        <button className={`tgl theme${isLight ? '' : ' b'}`} onClick={toggleTheme} role="switch" aria-checked={!isLight} aria-label={c.ui.theme}>
            <svg viewBox="0 0 24 24" className="ti s" aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6 7 7M17 17l1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4" /></svg>
            <svg viewBox="0 0 24 24" className="ti m" aria-hidden="true"><path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z" /></svg>
            <i className="th" />
        </button>
    );

    const palItems: PalItem[] = [
        ...nav.map((n) => ({
            label: n.label,
            kind: c.ui.section,
            run: () => {
                if (isHome && n.anchor) document.getElementById(n.anchor)?.scrollIntoView({ behavior: 'smooth' });
                else router.push(n.href);
            },
        })),
        { label: c.nav.stack, kind: c.ui.section, run: () => (isHome ? document.getElementById('stack')?.scrollIntoView({ behavior: 'smooth' }) : router.push(`/${lang}#stack`)) },
        ...projects.map((p) => ({ label: p.title, kind: c.ui.case, run: () => router.push(`/${lang}/projects/${p.slug}`) })),
    ];

    return (
        <>
            <div className="pf pf-root" inert={pal}>
                <a className="skip" href="#contenido">{lang === 'es' ? 'Saltar al contenido' : 'Skip to content'}</a>
                <div className="aurora" aria-hidden="true"><i /><i /><i /><i /></div>
                <div className="shell">
                    <aside className="rail" aria-label={c.ui.profile_nav}>
                        <div>
                            <Link href={`/${lang}`} className="avatar" aria-label={c.nav.home}><Image src="/images/profile/adrian.webp" alt={c.ui.photo_alt} width={168} height={168} priority /></Link>
                            <p className="name">Adrian Roidel</p>
                            <p className="role">{c.role}. React, Next.js, Node.js.</p>
                            <span className="status"><i />{c.status}</span>
                            <ul className="spy">
                                {nav.map((n, k) => (
                                    <li key={n.key}>
                                        <Link href={n.href} aria-current={current === k} onClick={go(n)}>{n.label}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="rail-foot">
                            <div className="tools">
                                <button className="kbtn" onClick={openPal}>{c.ui.search} <kbd>Ctrl K</kbd></button>
                                {langBtn}
                                {themeBtn}
                            </div>
                            <span className="mono">{c.location}{clock ? ` · ${clock}` : ''}</span>
                        </div>
                    </aside>

                    <div style={{ minWidth: 0 }}>
                        <header className="topbar">
                            <i className="g-ref" aria-hidden="true" /><i className="g-blur" aria-hidden="true" />
                            <Link href={`/${lang}`} className="who">
                                <span className="avatar"><Image src="/images/profile/adrian.webp" alt="" width={72} height={72} /></span>
                                Adrian R.L.M
                            </Link>
                            <div className="tools">
                                {langBtn}
                                {themeBtn}
                                <button className="icobtn" onClick={openPal} aria-label={c.ui.search}>
                                    <Ico><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></Ico>
                                </button>
                            </div>
                        </header>
                        <main id="contenido">
                            {children}
                            {!isHome && (
                                <footer>
                                    <span>© {new Date().getFullYear()} Adrian Roidel Lastres Marinas. {c.footer}</span>
                                    <Link href={`/${lang}/about`}>{c.ui.about}</Link>
                                </footer>
                            )}
                        </main>
                    </div>
                </div>
            </div>

            {mounted && createPortal(
                <div className="pf pf-overlay">
                    <GlassDefs />
                    <nav className="dock" aria-label={c.ui.main_nav} style={{ ['--i' as string]: Math.max(0, current) }}>
                        <i className="g-ref" aria-hidden="true" /><i className="g-blur" aria-hidden="true" />
                        {current >= 0 && <span className="ind" />}
                        {nav.map((n, k) => (
                            <Link key={n.key} href={n.href} aria-current={current === k} onClick={go(n)}>{n.icon}{n.label}</Link>
                        ))}
                    </nav>
                    <div className={`veil${pal ? ' on' : ''}`} onClick={closePal} />
                    <Palette key={String(pal)} open={pal} items={palItems} c={c} onClose={closePal} />
                </div>,
                document.body
            )}
        </>
    );
}
