'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { HomeContent, HomeProject } from './types';

const AUTO_MS = 7000;

const ArrowR = () => (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);

interface Props {
    c: HomeContent;
    projects: HomeProject[];
    onSeeCase: (index: number) => void;
}

/**
 * Problemas: en escritorio, selector + panel de detalle con transición y avance automático;
 * en móvil, tarjetas a pantalla casi completa que se deslizan con guía de gesto.
 */
export default function ProblemsStage({ c, projects, onSeeCase }: Props) {
    const items = c.problems.items;
    const [cur, setCur] = useState(0);
    const [paused, setPaused] = useState(false);
    const [visible, setVisible] = useState(false);
    const [mIdx, setMIdx] = useState(0);
    const [touched, setTouched] = useState(false);
    const root = useRef<HTMLDivElement>(null);
    const track = useRef<HTMLDivElement>(null);
    const [dir, setDir] = useState(1);

    const pick = useCallback((i: number) => {
        setDir(i >= cur ? 1 : -1);
        setCur(i);
    }, [cur]);

    // solo corre el avance automático mientras la sección está en pantalla
    useEffect(() => {
        const el = root.current;
        if (!el) return;
        const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.35 });
        io.observe(el);
        return () => io.disconnect();
    }, []);

    useEffect(() => {
        if (paused || !visible || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        const t = window.setTimeout(() => { setDir(1); setCur((x) => (x + 1) % items.length); }, AUTO_MS);
        return () => window.clearTimeout(t);
    }, [cur, paused, visible, items.length]);

    const onTrack = () => {
        const el = track.current;
        if (!el) return;
        const first = el.firstElementChild as HTMLElement | null;
        const step = first ? first.offsetWidth + 12 : el.clientWidth;
        setMIdx(Math.min(items.length - 1, Math.max(0, Math.round(el.scrollLeft / step))));
        if (el.scrollLeft > 8) setTouched(true);
    };
    const goM = (i: number) => {
        const el = track.current;
        const first = el?.firstElementChild as HTMLElement | null;
        el?.scrollTo({ left: i * ((first?.offsetWidth ?? 0) + 12), behavior: 'smooth' });
    };

    const onKey = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { e.preventDefault(); pick((cur + 1) % items.length); }
        if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') { e.preventDefault(); pick((cur - 1 + items.length) % items.length); }
    };

    const rel = (it: (typeof items)[number]) => ('case' in it && it.case ? projects.findIndex((p) => p.slug === it.case) : -1);
    const it = items[cur];
    const ri = rel(it);

    return (
        <div className="pst" ref={root} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
            {/* ---------- Escritorio ---------- */}
            <div className="pst-d">
                <div className="pst-list" role="tablist" aria-orientation="vertical" onKeyDown={onKey}>
                    <span className="pst-bar" style={{ ['--i' as string]: cur, ['--n' as string]: items.length }} aria-hidden="true" />
                    {items.map((p, i) => (
                        <button
                            key={p.q}
                            role="tab"
                            id={`pt-${i}`}
                            aria-selected={i === cur}
                            aria-controls="pst-panel"
                            tabIndex={i === cur ? 0 : -1}
                            className={`pst-tab${i === cur ? ' on' : ''}`}
                            onClick={() => pick(i)}
                            onMouseEnter={() => pick(i)}
                        >
                            <span className="pst-n">{String(i + 1).padStart(2, '0')}</span>
                            <span className="pst-q">{p.q}</span>
                            <i className="pst-prog" aria-hidden="true" style={i === cur && visible && !paused ? { animation: `pstProg ${AUTO_MS}ms linear forwards` } : undefined} key={`${i}-${cur}-${paused}`} />
                        </button>
                    ))}
                </div>

                <div className="pst-panel" id="pst-panel" role="tabpanel" aria-labelledby={`pt-${cur}`} aria-live="polite">
                    <div className="pst-card" key={cur} data-dir={dir}>
                        <span className="pst-big" aria-hidden="true">{String(cur + 1).padStart(2, '0')}</span>
                        <span className={`tg ${it.tag}`}>{c.tags[it.tag as keyof typeof c.tags]}</span>
                        <h3 className="pst-title">{it.q}</h3>
                        <div className="pst-blk">
                            <h4>{c.problems.how}</h4>
                            <p>{it.how}</p>
                        </div>
                        <div className="pst-blk">
                            <h4>{c.problems.build}</h4>
                            <p className="pst-build">{it.build}</p>
                        </div>
                        {ri >= 0 && (
                            <button type="button" className="pst-go" onClick={() => onSeeCase(ri)}>{c.problems.see_case} <ArrowR /></button>
                        )}
                    </div>
                </div>
            </div>

            {/* ---------- Móvil ---------- */}
            <div className="pst-m">
                <div className="pst-track" ref={track} onScroll={onTrack}>
                    {items.map((p, i) => {
                        const r = rel(p);
                        return (
                            <article className="pst-mc" key={p.q} aria-label={`${i + 1} / ${items.length}`}>
                                <div className="pst-mh">
                                    <span className={`tg ${p.tag}`}>{c.tags[p.tag as keyof typeof c.tags]}</span>
                                    <span className="pst-mn">{String(i + 1).padStart(2, '0')}<small>/{String(items.length).padStart(2, '0')}</small></span>
                                </div>
                                <h3>{p.q}</h3>
                                <div className="pst-mb">
                                    <h4>{c.problems.how}</h4>
                                    <p>{p.how}</p>
                                </div>
                                <div className="pst-mb">
                                    <h4>{c.problems.build}</h4>
                                    <p className="pst-build">{p.build}</p>
                                </div>
                                {r >= 0 && (
                                    <button type="button" className="pst-go" onClick={() => onSeeCase(r)}>{c.problems.see_case} <ArrowR /></button>
                                )}
                            </article>
                        );
                    })}
                </div>
                <div className={`pst-mui${touched ? ' touched' : ''}`}>
                    <span className="pst-mhint" aria-hidden="true"><i /><i /><i /></span>
                    <span className="pst-dots">
                        {items.map((p, i) => (
                            <button key={p.q} type="button" className={i === mIdx ? 'on' : ''} aria-label={`${i + 1} / ${items.length}`} onClick={() => goM(i)} />
                        ))}
                    </span>
                </div>
            </div>
        </div>
    );
}
