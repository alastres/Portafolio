'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useReducedMotion, type Variants } from 'framer-motion';
import { TiltCard } from '@/components/ui/tilt-card';
import { EASE_OUT, slideInLeft, slideInRight, stagger, viewportOnce } from '@/lib/motion';
import Image from 'next/image';
import BlurImage from '@/components/ui/blur-image';
import { Project } from '@/types';
import { Badge } from '@/components/ui/badge-ui';
import { ArrowRight, MoveRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Locale } from '@/i18n-config';

interface ProjectsGridProps {
    projects: Project[];
    lang: Locale;
    dict: any;
}

function resolveKey(key: string, dict: any): string {
    const keys = key.split('.');
    let result = dict;
    for (const k of keys) {
        result = result?.[k];
        if (!result) return key;
    }
    return typeof result === 'string' ? result : key;
}

const rowVariants = stagger(0.15);

// El punto de la línea de tiempo aparece con un pequeño rebote.
const dotVariants: Variants = {
    hidden: { scale: 0, opacity: 0 },
    show: { scale: [0, 1.4, 1], opacity: 1, transition: { duration: 0.6, ease: EASE_OUT, delay: 0.1 } },
};

export default function ProjectsGrid({ projects, lang, dict }: ProjectsGridProps) {
    const ref = useRef<HTMLDivElement>(null);
    const reduce = useReducedMotion();
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 60%'] });
    // La línea central se dibuja a medida que se hace scroll.
    const lineScale = useTransform(scrollYProgress, [0, 1], [reduce ? 1 : 0, 1]);

    return (
        <div ref={ref} className="relative py-20 space-y-20 md:space-y-32 overflow-x-clip">
            {/* Central Line (Desktop) */}
            <motion.div style={{ scaleY: lineScale, transformOrigin: 'top' }} className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-blue-500/50 to-transparent hidden md:block" />

            {projects.map((project, index) => {
                const isEven = index % 2 === 0;

                return (
                    <motion.div
                        key={project.slug}
                        variants={rowVariants}
                        initial="hidden"
                        whileInView="show"
                        viewport={viewportOnce}
                        className="relative z-10 grid md:grid-cols-2 gap-12 items-center"
                    >

                        {/* Timeline Dot (Desktop) */}
                        <motion.div variants={dotVariants} className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-background border-2 border-blue-500 hidden md:block shadow-[0_0_10px_rgba(59,130,246,0.5)]" />

                        {/* Content Section */}
                        <motion.div variants={isEven ? slideInLeft : slideInRight} className={cn(
                            "space-y-6",
                            isEven ? "md:text-right md:pr-16 order-2 md:order-1" : "md:text-left md:pl-16 order-2"
                        )}>
                            <div className={cn(
                                "flex flex-col gap-2",
                                isEven ? "md:items-end" : "md:items-start"
                            )}>
                                <span className="text-blue-500 text-xs font-bold tracking-[0.2em] uppercase">
                                    {String(index + 1).padStart(2, '0')} / {lang === 'es' ? 'Proyecto' : 'Project'}
                                </span>
                                <h2 className="text-3xl md:text-4xl font-black text-foreground tracking-tight">
                                    {resolveKey(project.title, dict)}
                                </h2>
                            </div>

                            <div className={cn("space-y-4 text-muted-foreground", isEven ? "md:mr-0 md:ml-auto" : "")}>
                                {project.problem && (
                                    <div>
                                        <strong className="text-foreground block mb-1">{resolveKey('projects.problem', dict)}</strong>
                                        <p className="text-sm leading-relaxed max-w-md ml-auto mr-0">
                                            {typeof project.problem === 'string'
                                                ? resolveKey(project.problem, dict)
                                                : resolveKey(project.problem.description, dict).substring(0, 150) + '...'}
                                        </p>
                                    </div>
                                )}

                                {project.solution && (
                                    <div>
                                        <strong className="text-foreground block mb-1">{resolveKey('projects.solution', dict)}</strong>
                                        <p className="text-sm leading-relaxed max-w-md ml-auto mr-0">
                                            {typeof project.solution === 'string'
                                                ? resolveKey(project.solution, dict)
                                                : resolveKey(project.solution.description, dict).substring(0, 150) + '...'}
                                        </p>
                                    </div>
                                )}
                            </div>

                            <div className={cn(
                                "flex flex-wrap gap-2 pt-2",
                                isEven ? "md:justify-end" : "md:justify-start"
                            )}>
                                {project.tags.slice(0, 4).map((tag) => (
                                    <Badge key={tag} variant="secondary" className="bg-secondary/50 border-neutral-200 dark:border-border/50 text-xs">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>

                            <div className={cn("pt-4", isEven ? "flex md:justify-end" : "")}>
                                <Link
                                    href={`/${lang}/projects/${project.slug}`}
                                    className="group inline-flex items-center text-sm font-bold text-foreground hover:text-blue-400 transition-colors uppercase tracking-widest gap-2"
                                >
                                    {lang === 'es' ? 'Ver Proyecto' : 'View Project'}
                                    <MoveRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </div>
                        </motion.div>

                        {/* Image Section */}
                        <motion.div variants={isEven ? slideInRight : slideInLeft} className={cn(
                            "relative group",
                            isEven ? "md:pl-16 order-1 md:order-2" : "md:pr-16 order-1"
                        )}>
                            <Link href={`/${lang}/projects/${project.slug}`} className="block">
                                <TiltCard>
                                <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-card/5 backdrop-blur-sm transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] group-hover:border-blue-500/30">
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-transparent to-transparent opacity-60 z-10" />

                                    {project.image ? (
                                        <div className="relative w-full h-full">
                                            <BlurImage
                                                src={project.image}
                                                alt={project.title}
                                                fill
                                                className="object-cover object-top transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                                                sizes="(max-width: 768px) 100vw, 50vw"
                                            />
                                        </div>
                                    ) : (
                                        /* Abstract Placeholder for Image */
                                        <div className="w-full h-full bg-gradient-to-br from-blue-900/20 to-purple-900/20 relative flex items-center justify-center">
                                            <div className="w-[85%] h-[85%] bg-[#0f172a] rounded-lg shadow-2xl border border-white/10 p-4 flex flex-col gap-4 opacity-90 group-hover:opacity-100 transition-opacity transform group-hover:-translate-y-1 duration-500">
                                                {/* Fake Browser Header */}
                                                <div className="flex items-center gap-2 mb-2">
                                                    <div className="w-2 h-2 rounded-full bg-red-500/50" />
                                                    <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                                                    <div className="w-2 h-2 rounded-full bg-green-500/50" />
                                                </div>
                                                {/* UI Mockup */}
                                                <div className="flex-1 flex flex-col gap-3">
                                                    <div className="h-2 w-1/3 bg-white/10 rounded-full" />
                                                    <div className="flex-1 grid grid-cols-12 gap-3">
                                                        <div className="col-span-3 bg-blue-500/10 rounded h-full" />
                                                        <div className="col-span-9 bg-white/5 rounded h-full flex flex-col gap-2 p-2">
                                                            <div className="h-2 w-full bg-white/5 rounded" />
                                                            <div className="h-2 w-3/4 bg-white/5 rounded" />
                                                            <div className="h-20 w-full bg-white/5 rounded mt-auto" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                </TiltCard>
                            </Link>
                        </motion.div>

                    </motion.div>
                );
            })}
        </div>
    );
}
