'use client';

import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import Link from 'next/link';
import type { Locale } from '@/i18n-config';
import type { HomeContent, HomeProject } from './types';
import ProblemsStage from './ProblemsStage';
import './home.css';

const EMAIL = 'adrian47388@gmail.com';
const LINKEDIN = 'https://linkedin.com/in/alas3s';
const GITHUB = 'https://github.com/alastres';
const CV = '/Adrian_Roidel_CV.pdf';
const SHOW_MS = 4200;

const pad = (n: number) => String(n).padStart(2, '0');
const uses = (name: string, p: HomeProject) => {
    const key = name.toLowerCase().split(' ')[0];
    return p.tags.some((t) => t.toLowerCase().includes(key));
};
const reduceMotion = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function Ico({ children }: { children: ReactNode }) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            {children}
        </svg>
    );
}
const ArrowUR = () => (
    <Ico>
        <path d="M7 17 17 7M8 7h9v9" />
    </Ico>
);
const ArrowR = () => (
    <Ico>
        <path d="M5 12h14M13 6l6 6-6 6" />
    </Ico>
);

/** Texto con *acento*: la parte entre asteriscos se subraya a mano. */
function HeroLine({ text }: { text: string }) {
    const parts = text.split('*');
    return (
        <span className="ln">
            <span>
                {parts.map((part, i) =>
                    i % 2 === 1 ? (
                        <span className="u" key={i}>
                            {part}
                            <svg viewBox="0 0 200 12" preserveAspectRatio="none" aria-hidden="true">
                                <path d="M2 8 C 40 2, 90 12, 198 4" />
                            </svg>
                        </span>
                    ) : (
                        part
                    )
                )}
            </span>
        </span>
    );
}

/* ------------------------------------------------------------------ Escaparate */

function Showcase({ projects, onOpen }: { projects: HomeProject[]; onOpen: (i: number) => void }) {
    const [cur, setCur] = useState(0);
    const [cycle, setCycle] = useState(0);
    const [paused, setPaused] = useState(false);
    const frame = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (paused || reduceMotion()) return;
        const t = setTimeout(() => setCur((c) => (c + 1) % projects.length), SHOW_MS);
        return () => clearTimeout(t);
    }, [cur, cycle, paused, projects.length]);

    const tilt = (e: React.PointerEvent) => {
        if (e.pointerType !== 'mouse' || !frame.current) return;
        const r = frame.current.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        frame.current.style.setProperty('--ry', `${(x * 7).toFixed(2)}deg`);
        frame.current.style.setProperty('--rx', `${(-y * 6).toFixed(2)}deg`);
    };
    const untilt = () => {
        frame.current?.style.setProperty('--ry', '0deg');
        frame.current?.style.setProperty('--rx', '0deg');
        setPaused(false);
        setCycle((n) => n + 1);
    };
    const p = projects[cur];

    return (
        <div className="show" onPointerEnter={() => setPaused(true)} onPointerLeave={untilt} onPointerMove={tilt}>
            <button ref={frame} className="fr" onClick={() => onOpen(cur)} aria-label={p.title}>
                <div className="bar">
                    <i />
                    <i />
                    <i />
                    <span>{(p.link ?? 'github.com/alastres').replace(/^https?:\/\//, '')}</span>
                </div>
                <div className="stage">
                    {projects.map((pr, i) => (
                        <Image
                            key={pr.slug}
                            src={pr.image}
                            alt=""
                            fill
                            sizes="(max-width:1023px) 100vw, 800px"
                            priority={i === 0}
                            className={i === cur ? 'on' : ''}
                        />
                    ))}
                </div>
                <div className="cap">
                    <b>{p.title}</b>
                    <small>
                        {pad(cur + 1)} / {pad(projects.length)}
                    </small>
                </div>
                <div className="ticks" style={{ ['--d' as string]: `${SHOW_MS}ms` }} aria-hidden="true">
                    {projects.map((_, k) => (
                        <i key={`${k}-${k === cur ? `${cur}-${cycle}` : 'x'}`} className={k < cur ? 'done' : k === cur ? 'on' : ''} />
                    ))}
                </div>
            </button>
        </div>
    );
}

/* ------------------------------------------------------------------ Hoja de detalle */

function Sheet({
    open, p, i, total, c, lang, prev, next, onClose, onNav,
}: {
    open: boolean; p: HomeProject; i: number; total: number; c: HomeContent; lang: Locale; prev: string; next: string;
    onClose: () => void; onNav: (d: number) => void;
}) {
    const [dy, setDy] = useState(0);
    const [drag, setDrag] = useState(false);
    const y0 = useRef<number | null>(null);
    const body = useRef<HTMLDivElement>(null);
    const closeBtn = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (!open) return;
        body.current?.scrollTo({ top: 0 });
        closeBtn.current?.focus();
    }, [open, i]);

    const end = (e: React.PointerEvent) => {
        if (y0.current === null) return;
        const d = e.clientY - y0.current;
        y0.current = null;
        setDrag(false);
        if (d > 90) onClose();
        setDy(0);
    };

    return (
        <aside
            className={`sheet${open ? ' on' : ''}${drag ? ' drag' : ''}`}
            style={{ ['--dy' as string]: `${dy}px` }}
            role="dialog"
            aria-modal="true"
            aria-label={p.title}
            aria-hidden={!open}
            inert={!open}
        >
            <button ref={closeBtn} className="x" onClick={onClose} aria-label={c.ui.close}>
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg>
            </button>
            <div
                className="grab"
                onPointerDown={(e) => { y0.current = e.clientY; setDrag(true); e.currentTarget.setPointerCapture(e.pointerId); }}
                onPointerMove={(e) => { if (y0.current !== null) setDy(Math.max(0, e.clientY - y0.current)); }}
                onPointerUp={end}
                onPointerCancel={end}
            >
                <i />
            </div>
            <div className="sbody" ref={body}>
                <div className="cover">
                    <Image src={p.image} alt="" fill sizes="(max-width:1023px) 100vw, 520px" />
                </div>
                <h3>{p.title}</h3>
                <div className="meta"><span>{p.role}</span><span>{p.timeline}</span></div>
                <h4>{c.cases.problem}</h4>
                <p>{p.problem}</p>
                <h4>{c.cases.solution}</h4>
                <p>{p.solution}</p>
                <h4>{c.cases.tech}</h4>
                <div className="chips">{p.tags.map((t) => <span key={t}>{t}</span>)}</div>
                <div className="sact">
                    {p.link && <a className="btn p" href={p.link} target="_blank" rel="noopener noreferrer">{c.cases.demo} <ArrowUR /></a>}
                    {p.github && <a className="btn" href={p.github} target="_blank" rel="noopener noreferrer">{c.cases.code}</a>}
                    <Link className="btn" href={`/${lang}/projects/${p.slug}`}>{c.cases.full}</Link>
                </div>
                <div className="snav">
                    <button onClick={() => onNav(-1)}><small>{c.cases.prev}</small>{prev}</button>
                    <button onClick={() => onNav(1)}><small>{c.cases.next}</small>{next}</button>
                </div>
                <span hidden>{i + 1}/{total}</span>
            </div>
        </aside>
    );
}

/* ------------------------------------------------------------------ Página */

export default function HomeExperience({ lang, c, projects }: { lang: Locale; c: HomeContent; projects: HomeProject[] }) {
    const mounted = useSyncExternalStore(() => () => {}, () => true, () => false);
    const [sheet, setSheet] = useState<number | null>(null);
    const [shown, setShown] = useState(0);
    const [filter, setFilter] = useState<string | null>(null);
    const [tab, setTab] = useState(0);
    const [dot, setDot] = useState(0);
    const lastFocus = useRef<HTMLElement | null>(null);
    const workRef = useRef<HTMLDivElement>(null);
    const raf = useRef(0);

    // Bloquear el scroll de fondo con una hoja o la paleta abiertas
    useEffect(() => {
        const lock = sheet !== null;
        document.documentElement.classList.toggle('pf-lock', lock);
        return () => document.documentElement.classList.remove('pf-lock');
    }, [sheet]);

    const openSheet = useCallback((i: number) => {
        setSheet((cur) => { if (cur === null) lastFocus.current = document.activeElement as HTMLElement; return i; });
        setShown(i);
    }, []);
    const closeSheet = useCallback(() => { setSheet(null); lastFocus.current?.focus?.(); }, []);

    // Atajos de teclado
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (document.querySelector('.pf .pal.on')) return;
            if (e.key === 'Escape') { if (sheet !== null) closeSheet(); return; }
            if (sheet !== null) {
                if (e.key === 'ArrowRight') openSheet((sheet + 1) % projects.length);
                if (e.key === 'ArrowLeft') openSheet((sheet + projects.length - 1) % projects.length);
            }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [sheet, projects.length, openSheet, closeSheet]);

    // Carrusel: puntos de progreso y paralaje de las capturas
    const onWork = useCallback(() => {
        const el = workRef.current;
        if (!el || raf.current) return;
        raf.current = requestAnimationFrame(() => {
            raf.current = 0;
            const first = el.children[0] as HTMLElement | undefined;
            if (!first) return;
            const scrollable = el.scrollWidth > el.clientWidth + 2;
            const wr = el.getBoundingClientRect();
            const mid = wr.left + wr.width / 2;
            Array.from(el.children).forEach((ch) => {
                const card = ch as HTMLElement;
                if (!scrollable) { card.style.removeProperty('--px'); return; }
                const r = card.getBoundingClientRect();
                card.style.setProperty('--px', `${(-((r.left + r.width / 2 - mid) / wr.width) * 34).toFixed(1)}px`);
            });
            if (scrollable) {
                const step = first.getBoundingClientRect().width + 14;
                setDot(Math.min(projects.length - 1, Math.max(0, Math.round(el.scrollLeft / step))));
            }
        });
    }, [projects.length]);
    useEffect(() => {
        onWork();
        window.addEventListener('resize', onWork);
        return () => window.removeEventListener('resize', onWork);
    }, [onWork]);

    const applyFilter = (name: string | null) => {
        setFilter(name);
        if (!name) return;
        document.getElementById('casos')?.scrollIntoView({ behavior: 'smooth' });
        const first = projects.findIndex((p) => uses(name, p));
        const el = workRef.current;
        if (first > 0 && el && el.scrollWidth > el.clientWidth) {
            setTimeout(() => el.scrollTo({ left: (el.children[first] as HTMLElement).offsetLeft - 16, behavior: 'smooth' }), 500);
        }
    };

    const goTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

    const overlayOpen = sheet !== null;
    const sp = projects[shown];

    return (
        <>
            <div className="pf-home" inert={overlayOpen}>
                            {/* ---------------- Inicio ---------------- */}
                            <section id="inicio">
                                <p className="eyebrow">{c.role} · {c.location}</p>
                                <h1 className="hero-h" aria-label={c.h1.join(' ').replace(/\*/g, '')}>
                                    {c.h1.map((line) => <HeroLine key={line} text={line} />)}
                                </h1>
                                <p className="lead">{c.lead}</p>
                                <div className="cta">
                                    <Link className="btn p" href={`/${lang}/contact`}>{c.cta_primary} <ArrowR /></Link>
                                    <a className="btn" href="#casos" onClick={(e) => { e.preventDefault(); goTo('casos'); }}>{c.cta_secondary}</a>
                                </div>
                                <Showcase projects={projects} onOpen={openSheet} />
                                <div className="facts">
                                    {c.outcomes.map((o) => (
                                        <div key={o.t}><b>{o.t}</b><span>{o.d}</span></div>
                                    ))}
                                </div>
                            </section>

                            {/* ---------------- Problemas ---------------- */}
                            <section id="problemas">
                                <div className="rv">
                                    <p className="eyebrow">{c.problems.eyebrow}</p>
                                    <h2>{c.problems.title}</h2>
                                    <p className="sub">{c.problems.sub}</p>
                                </div>
                                <div className="rv"><ProblemsStage c={c} projects={projects} onSeeCase={openSheet} /></div>
                            </section>

                            {/* ---------------- Casos ---------------- */}
                            <section id="casos">
                                <div className="head rv">
                                    <div>
                                        <p className="eyebrow">{c.cases.eyebrow}</p>
                                        <h2>{c.cases.title}</h2>
                                        <p className="sub" style={{ margin: 0 }}>{c.cases.sub}</p>
                                    </div>
                                    <span className="count">{pad(dot + 1)} / {pad(projects.length)}</span>
                                </div>
                                <div className={`filt${filter ? ' on' : ''}`} aria-live="polite">
                                    <span>{filter ? c.cases.filter.replace('{tech}', filter) : ''}</span>
                                    <button onClick={() => applyFilter(null)}>{c.cases.clear}</button>
                                </div>
                                <div className="work" ref={workRef} onScroll={onWork}>
                                    {projects.map((p, i) => (
                                        <button key={p.slug} className={`card${filter && !uses(filter, p) ? ' dim' : ''}`} onClick={() => openSheet(i)} aria-label={`${c.ui.open_case}: ${p.title}`}>
                                            <div className="ph">
                                                <span className="n">{pad(i + 1)}</span>
                                                <Image src={p.image} alt="" fill sizes="(max-width:1023px) 80vw, 50vw" />
                                            </div>
                                            <div className="b">
                                                <h3>{p.title}</h3>
                                                <span className="for">{p.forWho}</span>
                                                <p>{p.description}</p>
                                                <div className="chips">{p.tags.slice(0, 3).map((t) => <span key={t}>{t}</span>)}</div>
                                                <div className="go">{c.cases.go} <ArrowUR /></div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                                <div className="dots" aria-hidden="true">
                                    {projects.map((p, i) => <i key={p.slug} className={i === dot ? 'on' : ''} />)}
                                </div>
                                <p style={{ marginTop: 22 }}><Link className="btn" href={`/${lang}/projects`}>{c.ui.all_cases} <ArrowR /></Link></p>
                            </section>

                            {/* ---------------- Tecnología ---------------- */}
                            <section id="stack">
                                <div className="rv">
                                    <p className="eyebrow">{c.stack.eyebrow}</p>
                                    <h2>{c.stack.title}</h2>
                                    <p className="sub">{c.stack.sub}</p>
                                </div>
                                <div className="seg" role="tablist" style={{ ['--s' as string]: tab }}>
                                    <span className="pill" />
                                    {c.stack.tabs.map((t, k) => (
                                        <button key={t} role="tab" aria-selected={tab === k} onClick={() => setTab(k)}>{t}</button>
                                    ))}
                                </div>
                                <div className="cloud" role="tabpanel" key={tab}>
                                    {c.stack.items[tab].map((t) => {
                                        const n = projects.filter((p) => uses(t, p)).length;
                                        return (
                                            <button key={t} onClick={() => n && applyFilter(t)} aria-label={n ? `${t}, ${n}` : t} style={n ? undefined : { cursor: 'default' }}>
                                                {t}{n > 0 && <em>{n}</em>}
                                            </button>
                                        );
                                    })}
                                </div>
                            </section>

                            {/* ---------------- Contacto ---------------- */}
                            <section id="contacto">
                                <div className="contact-grid">
                                    <div>
                                        <p className="eyebrow">{c.contact.eyebrow}</p>
                                        <h2 className="big">{c.contact.title} <em>{c.contact.accent}</em></h2>
                                        <div className="contact-photo-m">
                                            <span className="avatar"><Image src="/images/profile/adrian.webp" alt="" width={136} height={136} /></span>
                                            <p>{c.contact.sub}</p>
                                        </div>
                                        <p className="sub desk">{c.contact.sub}</p>
                                        <div className="rows">
                                            <a className="row" href={`mailto:${EMAIL}`}>
                                                <span><b>{c.contact.email}</b><small>{EMAIL}</small></span>
                                                <span className="ar"><ArrowUR /></span>
                                            </a>
                                            <Link className="row" href={`/${lang}/contact`}>
                                                <span><b>{c.contact.form}</b><small>{c.contact.form_sub}</small></span>
                                                <span className="ar"><ArrowUR /></span>
                                            </Link>
                                            <a className="row" href={LINKEDIN} target="_blank" rel="noopener noreferrer">
                                                <span><b>{c.contact.linkedin}</b><small>{c.contact.linkedin_sub}</small></span>
                                                <span className="ar"><ArrowUR /></span>
                                            </a>
                                            <a className="row" href={GITHUB} target="_blank" rel="noopener noreferrer">
                                                <span><b>{c.contact.github}</b><small>{c.contact.github_sub}</small></span>
                                                <span className="ar"><ArrowUR /></span>
                                            </a>
                                            <a className="row" href={CV} download>
                                                <span><b>{c.contact.cv}</b><small>{c.contact.cv_sub}</small></span>
                                                <span className="ar"><Ico><path d="M12 4v11m0 0-4-4m4 4 4-4M5 20h14" /></Ico></span>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="portrait" aria-hidden="true">
                                        <div className="avatar"><Image src="/images/profile/adrian.webp" alt="" width={460} height={460} /></div>
                                    </div>
                                </div>
                                <footer>
                                    <span>© {new Date().getFullYear()} Adrian Roidel Lastres Marinas. {c.footer}</span>
                                    <Link href={`/${lang}/about`}>{c.ui.about}</Link>
                                </footer>
                            </section>
            </div>

            {mounted && createPortal(
                <div className={`pf pf-overlay`}>
                    <div className={`veil${overlayOpen ? ' on' : ''}`} onClick={closeSheet} />
                    <Sheet
                        open={sheet !== null}
                        p={sp}
                        i={shown}
                        total={projects.length}
                        c={c}
                        lang={lang}
                        prev={projects[(shown + projects.length - 1) % projects.length].title}
                        next={projects[(shown + 1) % projects.length].title}
                        onClose={closeSheet}
                        onNav={(d) => openSheet((shown + d + projects.length) % projects.length)}
                    />
                </div>,
                document.body
            )}
        </>
    );
}
