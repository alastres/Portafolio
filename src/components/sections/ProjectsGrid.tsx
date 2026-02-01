'use client';

import Link from 'next/link';
import Image from 'next/image';
import BlurImage from '@/components/ui/blur-image';
import { Project } from '@/types';
import { Badge } from '@/components/ui/badge-ui';
import { ArrowRight, MoveRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProjectsGridProps {
    projects: Project[];
}

export default function ProjectsGrid({ projects }: ProjectsGridProps) {
    return (
        <div className="relative py-20 space-y-20 md:space-y-32">
            {/* Central Line (Desktop) */}
            <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-blue-500/50 to-transparent hidden md:block" />

            {projects.map((project, index) => {
                const isEven = index % 2 === 0;

                return (
                    <div key={project.slug} className="relative z-10 grid md:grid-cols-2 gap-12 items-center">

                        {/* Timeline Dot (Desktop) */}
                        <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-background border-2 border-blue-500 hidden md:block shadow-[0_0_10px_rgba(59,130,246,0.5)]" />

                        {/* Content Section */}
                        <div className={cn(
                            "space-y-6",
                            isEven ? "md:text-right md:pr-16 order-2 md:order-1" : "md:text-left md:pl-16 order-2"
                        )}>
                            <div className={cn(
                                "flex flex-col gap-2",
                                isEven ? "md:items-end" : "md:items-start"
                            )}>
                                <span className="text-blue-500 text-xs font-bold tracking-[0.2em] uppercase">
                                    {String(index + 1).padStart(2, '0')} / {project.role || 'Project'}
                                </span>
                                <h2 className="text-3xl md:text-4xl font-black text-foreground tracking-tight">
                                    {project.title}
                                </h2>
                            </div>

                            <div className={cn("space-y-4 text-muted-foreground", isEven ? "md:mr-0 md:ml-auto" : "")}>
                                {project.problem && (
                                    <div>
                                        <strong className="text-foreground block mb-1">El Problema:</strong>
                                        <p className="text-sm leading-relaxed max-w-md ml-auto mr-0">
                                            {typeof project.problem === 'string' ? project.problem : project.problem.description.substring(0, 150) + '...'}
                                        </p>
                                    </div>
                                )}

                                {project.solution && (
                                    <div>
                                        <strong className="text-foreground block mb-1">La Solución:</strong>
                                        <p className="text-sm leading-relaxed max-w-md ml-auto mr-0">
                                            {typeof project.solution === 'string' ? project.solution : project.solution.description.substring(0, 150) + '...'}
                                        </p>
                                    </div>
                                )}
                            </div>

                            <div className={cn(
                                "flex flex-wrap gap-2 pt-2",
                                isEven ? "md:justify-end" : "md:justify-start"
                            )}>
                                {project.tags.slice(0, 4).map((tag) => (
                                    <Badge key={tag} variant="secondary" className="bg-secondary/50 border-border/50 text-xs">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>

                            <div className={cn("pt-4", isEven ? "flex md:justify-end" : "")}>
                                <Link
                                    href={`/projects/${project.slug}`}
                                    className="group inline-flex items-center text-sm font-bold text-foreground hover:text-blue-400 transition-colors uppercase tracking-widest gap-2"
                                >
                                    Explorar Historia del Proyecto
                                    <MoveRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </div>
                        </div>

                        {/* Image Section */}
                        <div className={cn(
                            "relative group",
                            isEven ? "md:pl-16 order-1 md:order-2" : "md:pr-16 order-1"
                        )}>
                            <Link href={`/projects/${project.slug}`} className="block">
                                <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-card/5 backdrop-blur-sm transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] group-hover:border-blue-500/30">
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-transparent to-transparent opacity-60 z-10" />

                                    {project.image ? (
                                        <div className="relative w-full h-full">
                                            <BlurImage
                                                src={project.image}
                                                alt={project.title}
                                                fill
                                                className="object-cover object-top"
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
                            </Link>
                        </div>

                    </div>
                );
            })}
        </div>
    );
}
