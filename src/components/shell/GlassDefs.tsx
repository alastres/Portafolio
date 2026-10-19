'use client';

import { useEffect, useState } from 'react';

interface Dim { w: number; h: number; r: number }

/** SVG del mapa de desplazamiento: los bordes "curvan" lo que hay detrás y el centro queda plano. */
function mapUri({ w, h, r }: Dim, bezel: number) {
    const svg =
        `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">` +
        `<defs><linearGradient id="R" x1="100%" y1="0" x2="0" y2="0"><stop offset="0" stop-color="#0000"/><stop offset="1" stop-color="red"/></linearGradient>` +
        `<linearGradient id="B" x1="0" y1="0" x2="0" y2="100%"><stop offset="0" stop-color="#0000"/><stop offset="1" stop-color="blue"/></linearGradient></defs>` +
        `<rect width="${w}" height="${h}" fill="black"/>` +
        `<rect width="${w}" height="${h}" rx="${r}" fill="url(#R)"/>` +
        `<rect width="${w}" height="${h}" rx="${r}" fill="url(#B)" style="mix-blend-mode:difference"/>` +
        `<rect x="${bezel}" y="${bezel}" width="${Math.max(1, w - bezel * 2)}" height="${Math.max(1, h - bezel * 2)}" rx="${Math.max(0, r - bezel)}" fill="hsl(0 0% 50% / .94)" style="filter:blur(${Math.round(bezel * 0.9)}px)"/>` +
        `</svg>`;
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

const TARGETS = [
    { id: 'lg-dock', sel: '.pf .dock', bezel: 16, scale: 34 },
    { id: 'lg-bar', sel: '.pf .topbar', bezel: 14, scale: 22 },
] as const;

/**
 * Cristal líquido: desenfoque + refracción del fondo (backdrop-filter con filtro SVG).
 * Solo se activa en motores Chromium; el resto usa el desenfoque normal del CSS.
 */
export default function GlassDefs() {
    const [dims, setDims] = useState<Record<string, Dim>>({});

    useEffect(() => {
        const brands = (navigator as Navigator & { userAgentData?: { brands: { brand: string }[] } }).userAgentData?.brands ?? [];
        const chromium = brands.some((b) => /Chromium/i.test(b.brand));
        if (!chromium || !CSS.supports('backdrop-filter', 'url(#x)')) return;

        const ro = new ResizeObserver((entries) => {
            setDims((prev) => {
                const next = { ...prev };
                entries.forEach((e) => {
                    const t = TARGETS.find((x) => (e.target as HTMLElement).matches(x.sel));
                    if (!t) return;
                    const box = e.target as HTMLElement;
                    const w = Math.round(box.offsetWidth), h = Math.round(box.offsetHeight);
                    if (!w || !h) return;
                    const r = 26;
                    if (prev[t.id]?.w !== w || prev[t.id]?.h !== h) next[t.id] = { w, h, r };
                    document.documentElement.classList.add('lg-ok');
                });
                return next;
            });
        });
        const seen = new Set<Element>();
        const attach = () => {
            TARGETS.forEach((t) => {
                const el = document.querySelector(t.sel);
                if (el && !seen.has(el)) { seen.add(el); ro.observe(el); }
            });
        };
        attach();
        const mo = new MutationObserver(attach);
        mo.observe(document.body, { childList: true, subtree: true });
        return () => { mo.disconnect(); ro.disconnect(); document.documentElement.classList.remove('lg-ok'); };
    }, []);

    return (
        <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
            {TARGETS.map((t) => {
                const d = dims[t.id];
                if (!d) return null;
                return (
                    <filter key={t.id} id={t.id} x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
                        <feImage href={mapUri(d, t.bezel)} x="0" y="0" width={d.w} height={d.h} preserveAspectRatio="none" result="map" />
                        <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="soft" />
                        <feDisplacementMap in="soft" in2="map" scale={t.scale} xChannelSelector="R" yChannelSelector="B" />
                    </filter>
                );
            })}
        </svg>
    );
}
