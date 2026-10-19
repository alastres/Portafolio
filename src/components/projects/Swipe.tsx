'use client';

import { Children, useCallback, useRef, useState, type ReactNode } from 'react';

interface Props {
    children: ReactNode;
    className: string;
    as?: 'ul' | 'ol' | 'div';
    label: string;
}

/**
 * En móvil convierte una lista larga en un deslizador horizontal con guía visual (mano + flechas,
 * degradado lateral y puntos de progreso). En pantallas grandes conserva su disposición original.
 */
export default function Swipe({ children, className, as = 'div', label }: Props) {
    const track = useRef<HTMLElement>(null);
    const [idx, setIdx] = useState(0);
    const [touched, setTouched] = useState(false);
    const count = Children.count(children);
    const Tag = as as 'div';

    const onScroll = useCallback(() => {
        const el = track.current;
        if (!el) return;
        const first = el.firstElementChild as HTMLElement | null;
        const step = first ? first.offsetWidth + 12 : el.clientWidth;
        const i = Math.round(el.scrollLeft / step);
        setIdx(Math.min(count - 1, Math.max(0, i)));
        if (el.scrollLeft > 8) setTouched(true);
    }, [count]);

    const go = (i: number) => {
        const el = track.current;
        if (!el) return;
        const first = el.firstElementChild as HTMLElement | null;
        const step = first ? first.offsetWidth + 12 : el.clientWidth;
        el.scrollTo({ left: i * step, behavior: 'smooth' });
    };

    if (count < 2) return <Tag className={className}>{children}</Tag>;

    return (
        <div className={`swp${touched ? ' touched' : ''}${idx >= count - 1 ? ' end' : ''}`}>
            <Tag ref={track as never} className={`${className} swp-track`} onScroll={onScroll}>
                {children}
            </Tag>
            <div className="swp-ui" aria-hidden={false}>
                <span className="swp-hint" aria-hidden="true">
                    <svg viewBox="0 0 24 24"><path d="M9 11V5.5a1.5 1.5 0 0 1 3 0V10m0 0V8.5a1.5 1.5 0 0 1 3 0V11m0 0v-.5a1.5 1.5 0 0 1 3 0V15a6 6 0 0 1-6 6h-1a6 6 0 0 1-4.7-2.3L4 15.5a1.5 1.5 0 0 1 2.3-1.9L9 16" /></svg>
                    <i /><i /><i />
                    {label}
                </span>
                <span className="swp-dots" role="tablist">
                    {Array.from({ length: count }, (_, i) => (
                        <button key={i} type="button" className={i === idx ? 'on' : ''} aria-label={`${i + 1} / ${count}`} onClick={() => go(i)} />
                    ))}
                </span>
            </div>
        </div>
    );
}
