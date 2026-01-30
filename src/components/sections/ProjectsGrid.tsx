'use client';

import Link from 'next/link';
import { Project } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card-ui';
import { Badge } from '@/components/ui/badge-ui';
import { ArrowUpRight } from 'lucide-react';

interface ProjectsGridProps {
    projects: Project[];
}

export default function ProjectsGrid({ projects }: ProjectsGridProps) {
    return (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2 xl:gap-10">
            {projects.map((project) => (
                <Link key={project.slug} href={`/projects/${project.slug}`} className="block h-full group">
                    <Card className="h-full bg-card border-border hover:border-border/80 transition-all duration-300 overflow-hidden flex flex-col group-hover:-translate-y-1">
                        {/* Image Placeholder */}
                        <div className="h-64 bg-muted border-b border-border relative w-full overflow-hidden">
                            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground bg-gradient-to-br from-muted/50 to-muted opacity-50 group-hover:scale-105 transition-transform duration-500">
                                {/* Abstract UI representation */}
                                <div className="w-3/4 h-3/4 bg-card rounded-lg shadow-xl border border-border opacity-50 flex flex-col p-4">
                                    <div className="h-4 w-1/3 bg-muted-foreground/20 rounded mb-4" />
                                    <div className="flex-1 bg-muted-foreground/10 rounded" />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col flex-1 p-6">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-xl font-bold text-card-foreground group-hover:text-primary transition-colors">
                                    {project.title}
                                </h3>
                                <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                            </div>

                            <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed mb-6 flex-1">
                                {project.description}
                            </p>

                            <div className="flex flex-wrap gap-2">
                                {project.tags.slice(0, 3).map((tag) => (
                                    <Badge key={tag} variant="secondary" className="bg-secondary text-secondary-foreground border-border/50">
                                        {tag}
                                    </Badge>
                                ))}
                                {project.tags.length > 3 && (
                                    <Badge variant="secondary" className="bg-secondary text-muted-foreground border-border/50">
                                        +{project.tags.length - 3}
                                    </Badge>
                                )}
                            </div>
                        </div>
                    </Card>
                </Link>
            ))}
        </div>
    );
}
