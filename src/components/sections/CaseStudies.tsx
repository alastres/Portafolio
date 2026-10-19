'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Project } from '@/types';
import { EASE_OUT } from '@/lib/motion';
import type { Locale } from '@/i18n-config';

function resolveKey(key: string, dict: unknown): string {
    let result: unknown = dict;
    for (const k of key.split('.')) {
        result = (result as Record<string, unknown> | undefined)?.[k];
        if (!result) return key;
    }
    return typeof result === 'string' ? result : key;
}

/** Cuántas capturas se recorren dentro de cada caso (más pantallas = más scroll). */
const MAX_SHOTS = 4;

function CaseStudy({ project, index, total, lang, dict }: { project: Project; index: number; total: number; lang: Locale; dict: unknown }) {
    const ref = useRef<HTMLDivElement>(null);
    const reduce = useReducedMotion();
    const shots = (project.gallery?.length ? project.gallery : project.image ? [project.image] : []).slice(0, MAX_SHOTS);
    const [active, setActive] = useState(0);

    const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

    // La captura activa depende del avance dentro del caso.
    useMotionValueEvent(scrollYProgress, 'change', (v) => {
        const i = Math.min(shots.length - 1, Math.max(0, Math.floor(v * shots.length)));
        setActive((prev) => (prev === i ? prev : i));
    });

    const frameScale = useTransform(scrollYProgress, [0, 0.15, 1], reduce ? [1, 1, 1] : [0.92, 1, 1.03]);
    const frameY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [30, -30]);
    const numberX = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-40, 40]);
    const progress = useTransform(scrollYProgress, [0, 1], [0, 1]);

    const title = resolveKey(project.title, dict);
    const description = resolveKey(project.description, dict);
    const href = `/${lang}/projects/${project.slug}`;

    return (
        // Altura = tiempo de permanencia: cada captura dispone de ~70vh de scroll.
        <div ref={ref} style={{ height: `${Math.max(2, shots.length) * 70 + 40}vh` }} className={index > 0 ? 'relative -mt-[14vh]' : 'relative'}>
            <div className="sticky top-0 h-screen flex items-center overflow-hidden">
                {/* Número gigante de fondo, desplazado en horizontal con el scroll */}
                <motion.span
                    aria-hidden
                    style={{ x: numberX }}
                    className="pointer-events-none absolute -left-4 top-1/2 -translate-y-1/2 select-none text-[28vw] font-black leading-none tracking-tighter text-foreground/[0.04]"
                >
                    {String(index + 1).padStart(2, '0')}
                </motion.span>

                <div className="container relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-4 pt-16 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8">
                    {/* Texto */}
                    <div className="order-2 lg:order-1 lg:col-span-5">
                        <motion.p
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-20%' }}
                            transition={{ duration: 0.6, ease: EASE_OUT }}
                            className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-primary"
                        >
                            {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                            {project.role ? ` · ${resolveKey(project.role, dict)}` : ''}
                        </motion.p>
                        <motion.h3
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-20%' }}
                            transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.05 }}
                            className="text-4xl font-black leading-[1.02] tracking-tighter text-foreground sm:text-5xl xl:text-6xl"
                        >
                            {title}
                        </motion.h3>
                        <motion.p
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-20%' }}
                            transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.15 }}
                            className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground"
                        >
                            {description}
                        </motion.p>

                        <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                            {project.tags.slice(0, 5).map((tag) => (
                                <li key={tag} className="font-mono">{tag}</li>
                            ))}
                        </ul>

                        <Link
                            href={href}
                            className="group mt-8 inline-flex items-center gap-2 border-b border-foreground/30 pb-1 text-sm font-semibold uppercase tracking-widest text-foreground transition-colors hover:border-primary hover:text-primary"
                        >
                            {lang === 'es' ? 'Ver caso completo' : 'View full case'}
                            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </Link>

                        {/* Indicador de pantallas */}
                        {shots.length > 1 && (
                            <div className="mt-10 flex items-center gap-3" aria-hidden>
                                <span className="font-mono text-xs text-muted-foreground">
                                    {String(active + 1).padStart(2, '0')}/{String(shots.length).padStart(2, '0')}
                                </span>
                                <div className="h-px w-40 overflow-hidden bg-border">
                                    <motion.div style={{ scaleX: progress, transformOrigin: 'left' }} className="h-full w-full bg-primary" />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Captura */}
                    <div className="order-1 lg:order-2 lg:col-span-7">
                        <motion.div
                            style={{ scale: frameScale, y: frameY }}
                            className="relative overflow-hidden rounded-xl border border-border bg-card shadow-2xl will-change-transform"
                        >
                            <div className="flex items-center gap-1.5 border-b border-border bg-muted/60 px-3 py-2">
                                <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
                                <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
                                <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
                                <span className="ml-3 truncate font-mono text-[11px] text-muted-foreground">
                                    {project.link ? project.link.replace(/^https?:\/\//, '') : project.slug}
                                </span>
                            </div>
                            <div className="relative aspect-[16/10] bg-muted/30">
                                {shots.map((src, i) => (
                                    <Image
                                        key={src}
                                        src={src}
                                        alt={`${title} — ${i + 1}`}
                                        fill
                                        sizes="(max-width: 1024px) 100vw, 58vw"
                                        priority={index === 0 && i === 0}
                                        className={`object-cover object-top transition-[opacity,transform] duration-700 ease-out ${
                                            i === active ? 'scale-100 opacity-100' : 'scale-[1.03] opacity-0'
                                        }`}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function CaseStudies({ projects, lang, dict }: { projects: Project[]; lang: Locale; dict: unknown }) {
    return (
        <div>
            {projects.map((p, i) => (
                <CaseStudy key={p.slug} project={p} index={i} total={projects.length} lang={lang} dict={dict} />
            ))}
        </div>
    );
}
