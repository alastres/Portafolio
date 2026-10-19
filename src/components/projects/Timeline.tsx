'use client';

import { useLayoutEffect, useRef, type ReactNode } from 'react';

const NODE_Y = 34; // centro de cada nodo respecto al inicio de su fila

/**
 * Cronología ligada al scroll. La línea se rellena con inercia (va un paso por detrás del dedo),
 * cada nodo se enciende cuando la línea llega hasta él y las tarjetas entran con un pequeño retardo.
 */
export default function Timeline({ children }: { children: ReactNode }) {
    const root = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const el = root.current;
        if (!el) return;
        const items = Array.from(el.querySelectorAll<HTMLElement>('.tl-item'));
        const fill = el.querySelector<HTMLElement>('.tl-fill');
        const glow = el.querySelector<HTMLElement>('.tl-glow');
        if (!items.length || !fill || !glow) return;
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        let cur = 0;
        let raf = 0;

        const frame = () => {
            raf = 0;
            const vh = window.innerHeight;
            const line = vh * 0.6;
            const top = el.getBoundingClientRect().top;
            const ys = items.map((li) => li.getBoundingClientRect().top - top + NODE_Y);
            const len = Math.max(1, ys[ys.length - 1] - ys[0]);
            el.style.setProperty('--len', `${len}px`);

            const raw = line - top - ys[0];
            const started = window.scrollY > 60;
            const target = reduce ? len : started ? Math.min(len, Math.max(0, raw)) : 0;
            cur = reduce ? target : cur + (target - cur) * 0.07;
            if (Math.abs(target - cur) < 0.3) cur = target;

            const k = (cur / len).toFixed(4);
            fill.style.transform = `scaleY(${k})`;
            glow.style.transform = `scaleY(${k})`;

            items.forEach((li, i) => {
                const b = li.getBoundingClientRect();
                const reached = reduce || (started && raw >= ys[i] - ys[0] && cur >= ys[i] - ys[0] - 1);
                li.classList.toggle('on', reached);
                li.classList.toggle('seen', reduce || b.top < vh * 0.9);
                li.style.setProperty('--py', `${(-((b.top + b.height / 2 - vh / 2) / vh) * 34).toFixed(1)}px`);
            });

            if (cur !== target) raf = requestAnimationFrame(frame);
        };
        const kick = () => { if (!raf) raf = requestAnimationFrame(frame); };

        el.classList.add('ready');
        frame();
        window.addEventListener('scroll', kick, { passive: true });
        window.addEventListener('resize', kick);
        return () => {
            window.removeEventListener('scroll', kick);
            window.removeEventListener('resize', kick);
            if (raf) cancelAnimationFrame(raf);
        };
    }, []);

    return (
        <div className="tl" ref={root}>
            <i className="tl-line" aria-hidden="true" />
            <i className="tl-glow" aria-hidden="true" />
            <i className="tl-fill" aria-hidden="true" />
            <ol className="tl-list">{children}</ol>
        </div>
    );
}
