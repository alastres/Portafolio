import { notFound } from 'next/navigation';
import { projects, getProjectBySlug } from '@/lib/projects';
import { constructMetadata } from '@/lib/seo';
import { Button } from '@/components/ui/button-ui';
import { Badge } from '@/components/ui/badge-ui';
import Link from 'next/link';
import { ExternalLink, Github, ArrowLeft } from 'lucide-react';

interface ProjectPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return projects.map((project) => ({
        slug: project.slug,
    }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
    const { slug } = await params;
    const project = getProjectBySlug(slug);

    if (!project) {
        return constructMetadata({ title: 'Project Not Found', description: 'Project not found' });
    }

    return constructMetadata({
        title: project.title,
        description: project.description,
    });
}

export default async function ProjectPage({ params }: ProjectPageProps) {
    const { slug } = await params;
    const project = getProjectBySlug(slug);

    if (!project) {
        notFound();
    }

    return (
        <article className="py-24 sm:py-32 pt-32 sm:pt-40">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <Link href="/projects" className="inline-flex items-center text-sm text-gray-500 hover:text-blue-400 mb-8 transition-colors">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Volver a proyectos
                </Link>
                {/* Header */}
                <header className="mb-20 max-w-4xl">
                    <div className="flex flex-wrap gap-3 mb-8">
                        {project.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="px-3 py-1 text-sm bg-blue-500/10 text-blue-400 border-blue-500/20 hover:bg-blue-500/20">
                                {tag}
                            </Badge>
                        ))}
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-8">{project.title}</h1>
                    <p className="text-xl md:text-2xl text-gray-400 mb-10 leading-relaxed max-w-3xl">{project.description}</p>
                    <div className="flex flex-wrap gap-4">
                        {project.link && (
                            <Button asChild className="h-12 bg-blue-600 hover:bg-blue-700">
                                <Link href={project.link} target="_blank" rel="noopener noreferrer">
                                    <ExternalLink className="mr-2 h-4 w-4" /> Ver Demo
                                </Link>
                            </Button>
                        )}
                        {project.github && (
                            <Button asChild variant="outline" className="h-12 border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white">
                                <Link href={project.github} target="_blank" rel="noopener noreferrer">
                                    <Github className="mr-2 h-4 w-4" /> Ver Código
                                </Link>
                            </Button>
                        )}
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
                    {/* Main Content */}
                    <div className="lg:col-span-8 space-y-20">
                        {project.problem && (
                            <section>
                                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                                    <span className="w-8 h-[1px] bg-blue-500 mr-4"></span>
                                    El Problema
                                </h2>
                                <p className="text-gray-400 leading-relaxed text-lg lg:text-xl">{project.problem}</p>
                            </section>
                        )}

                        {project.solution && (
                            <section>
                                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                                    <span className="w-8 h-[1px] bg-blue-500 mr-4"></span>
                                    La Solución
                                </h2>
                                <p className="text-gray-400 leading-relaxed text-lg lg:text-xl">{project.solution}</p>
                            </section>
                        )}

                        {project.challenges && (
                            <section>
                                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                                    <span className="w-8 h-[1px] bg-blue-500 mr-4"></span>
                                    Retos Técnicos
                                </h2>
                                <ul className="grid gap-4 text-gray-400 text-lg">
                                    {project.challenges.map((challenge, idx) => (
                                        <li key={idx} className="flex items-start">
                                            <span className="text-blue-500 mr-4 mt-1.5">•</span>
                                            <span>{challenge}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}

                        {project.learnings && (
                            <section>
                                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                                    <span className="w-8 h-[1px] bg-blue-500 mr-4"></span>
                                    Aprendizajes
                                </h2>
                                <ul className="grid gap-4 text-gray-400 text-lg">
                                    {project.learnings.map((learning, idx) => (
                                        <li key={idx} className="flex items-start">
                                            <span className="text-blue-500 mr-4 mt-1.5">•</span>
                                            <span>{learning}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}
                    </div>

                    {/* Sidebar for Stack */}
                    <aside className="lg:col-span-4">
                        <div className="bg-[#1e293b]/50 p-8 rounded-2xl border border-gray-800 sticky top-32 backdrop-blur-sm">
                            <h3 className="text-lg font-bold text-white mb-8 border-b border-gray-700 pb-4">Stack Técnico</h3>
                            {project.stackDetails ? (
                                <div className="space-y-8">
                                    {Object.entries(project.stackDetails).map(([category, stack]) => (
                                        <div key={category}>
                                            <h4 className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-3">{category}</h4>
                                            <p className="text-gray-300 font-medium leading-relaxed">{stack}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <ul className="space-y-3">
                                    {project.tags.map(tag => <li key={tag} className="text-gray-300 font-medium">{tag}</li>)}
                                </ul>
                            )}
                        </div>
                    </aside>
                </div>
            </div>
        </article>
    );
}
