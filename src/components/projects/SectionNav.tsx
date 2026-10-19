'use client';

import { useEffect, useState } from 'react';

/** Navegación flotante (cristal) con resaltado de la sección visible. */
export default function SectionNav({ items, label }: { items: { id: string; label: string }[]; label: string }) {
    const [act, setAct] = useState(items[0]?.id);

    useEffect(() => {
        const a = document.querySelector<HTMLElement>('.dnav-sc a[aria-current="true"]');
        const box = a?.parentElement;
        if (a && box && box.scrollWidth > box.clientWidth) {
            // solo desplaza el propio carril horizontal; nunca la página
            box.scrollTo({ left: a.offsetLeft - (box.clientWidth - a.offsetWidth) / 2, behavior: 'smooth' });
        }
    }, [act]);

    useEffect(() => {
        const io = new IntersectionObserver(
            (es) => es.forEach((e) => { if (e.isIntersecting) setAct(e.target.id); }),
            { rootMargin: '-30% 0px -60% 0px' }
        );
        items.forEach((i) => { const el = document.getElementById(i.id); if (el) io.observe(el); });
        return () => io.disconnect();
    }, [items]);

    if (items.length < 2) return null;
    return (
        <nav className="dnav" aria-label={label}>
            <div className="dnav-in"><div className="dnav-sc">
                {items.map((i) => (
                    <a
                        key={i.id}
                        href={`#${i.id}`}
                        aria-current={act === i.id}
                        onClick={(e) => { e.preventDefault(); document.getElementById(i.id)?.scrollIntoView({ behavior: 'smooth' }); }}
                    >
                        {i.label}
                    </a>
                ))}
            </div></div>
        </nav>
    );
}
