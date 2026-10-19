'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const AUTO_MS = 4500;

const Chev = ({ dir }: { dir: 'l' | 'r' }) => (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d={dir === 'l' ? 'm15 5-7 7 7 7' : 'm9 5 7 7-7 7'} /></svg>
);

interface GalleryProps {
    images: string[];
    title: string;
    host?: string;
    labels: { prev: string; next: string; open: string; close: string; of: string };
}

/** Slider de capturas reales: desliza con el dedo (scroll-snap), flechas, miniaturas, autoplay y visor ampliado. */
export default function Gallery({ images, title, host, labels }: GalleryProps) {
    const track = useRef<HTMLDivElement>(null);
    const thumbs = useRef<HTMLDivElement>(null);
    const raf = useRef(0);
    const [cur, setCur] = useState(0);
    const [paused, setPaused] = useState(false);
    const [lb, setLb] = useState(false);
    const n = images.length;

    const scrollTo = useCallback((i: number, smooth = true) => {
        const el = track.current;
        if (!el) return;
        const idx = (i + n) % n;
        el.scrollTo({ left: idx * el.clientWidth, behavior: smooth ? 'smooth' : 'auto' });
        setCur(idx);
    }, [n]);

    const onScroll = () => {
        const el = track.current;
        if (!el || raf.current) return;
        raf.current = requestAnimationFrame(() => {
            raf.current = 0;
            setCur(Math.round(el.scrollLeft / el.clientWidth));
        });
    };

    // Miniatura activa visible
    useEffect(() => {
        const t = thumbs.current?.children[cur] as HTMLElement | undefined;
        const box = thumbs.current;
        if (t && box) box.scrollTo({ left: t.offsetLeft - box.clientWidth / 2 + t.clientWidth / 2, behavior: 'smooth' });
    }, [cur]);

    // Autoplay (se pausa con el ratón, el foco, el visor o movimiento reducido)
    const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    useEffect(() => {
        if (paused || lb || reduce || n < 2) return;
        const t = setTimeout(() => scrollTo(cur + 1), AUTO_MS);
        return () => clearTimeout(t);
    }, [cur, paused, lb, reduce, n, scrollTo]);

    useEffect(() => {
        if (!lb) return;
        document.documentElement.classList.add('pf-lock');
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setLb(false);
            if (e.key === 'ArrowRight') setCur((c) => (c + 1) % n);
            if (e.key === 'ArrowLeft') setCur((c) => (c + n - 1) % n);
        };
        window.addEventListener('keydown', onKey);
        return () => { document.documentElement.classList.remove('pf-lock'); window.removeEventListener('keydown', onKey); };
    }, [lb, n]);

    const closeLb = () => { setLb(false); scrollTo(cur, false); };
    const pad = (x: number) => String(x).padStart(2, '0');

    if (!n) return null;

    return (
        <div
            className="gal"
            onPointerEnter={(e) => { if (e.pointerType === 'mouse') setPaused(true); }}
            onPointerLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
            onKeyDown={(e) => {
                if (e.key === 'ArrowRight') scrollTo(cur + 1);
                if (e.key === 'ArrowLeft') scrollTo(cur - 1);
            }}
            role="region"
            aria-roledescription="carousel"
            aria-label={title}
        >
            <div className="gal-glow" aria-hidden="true">
                <Image src={images[cur]} alt="" fill sizes="320px" quality={40} loading="lazy" />
            </div>
            <div className="gal-frame">
                <div className="gal-bar"><i /><i /><i /><span>{(host ?? 'github.com/alastres').replace(/^https?:\/\//, '')}</span></div>
                <div className="gal-track" ref={track} onScroll={onScroll}>
                    {images.map((src, i) => (
                        <button key={src} className="gal-slide" onClick={() => setLb(true)} aria-label={`${labels.open} ${i + 1}/${n}`}>
                            {(i === 0 || Math.abs(i - cur) <= 1) && (
                                <Image src={src} alt={`${title} ${i + 1}/${n}`} fill sizes="(max-width:1023px) 100vw, 880px" quality={75} priority={i === 0} loading={i === 0 ? undefined : 'lazy'} />
                            )}
                        </button>
                    ))}
                </div>
                {n > 1 && (
                    <>
                        <button className="gal-arrow l" onClick={() => scrollTo(cur - 1)} aria-label={labels.prev}><Chev dir="l" /></button>
                        <button className="gal-arrow r" onClick={() => scrollTo(cur + 1)} aria-label={labels.next}><Chev dir="r" /></button>
                    </>
                )}
                <span className="gal-count" aria-live="polite">{pad(cur + 1)} {labels.of} {pad(n)}</span>
                <div className="gal-prog" aria-hidden="true">
                    <i key={`${cur}-${paused}`} className={paused || reduce || lb ? '' : 'run'} style={{ ['--dur' as string]: `${AUTO_MS}ms` }} />
                </div>
            </div>

            {n > 1 && (
                <div className="gal-thumbs" ref={thumbs}>
                    {images.map((src, i) => (
                        <button key={src} aria-current={i === cur} aria-label={`${i + 1}/${n}`} onClick={() => scrollTo(i)}>
                            {Math.abs(i - cur) <= 6 && <Image src={src} alt="" fill sizes="128px" quality={50} loading="lazy" />}
                        </button>
                    ))}
                </div>
            )}

            <div className={`lb${lb ? ' on' : ''}`} role="dialog" aria-modal="true" aria-label={title} inert={!lb}>
                <button className="lb-x" onClick={closeLb} aria-label={labels.close}>
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
                </button>
                <div className="lb-img">
                    {lb && <Image src={images[cur]} alt={`${title} ${cur + 1}/${n}`} fill sizes="100vw" quality={90} />}
                </div>
                <div className="lb-bar">
                    <button onClick={() => setCur((c) => (c + n - 1) % n)} aria-label={labels.prev}><Chev dir="l" /></button>
                    <span>{pad(cur + 1)} {labels.of} {pad(n)}</span>
                    <button onClick={() => setCur((c) => (c + 1) % n)} aria-label={labels.next}><Chev dir="r" /></button>
                </div>
            </div>
        </div>
    );
}
