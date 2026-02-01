import { notFound } from 'next/navigation';
import Link from 'next/link';
import { projects, getProjectBySlug, getAdjacentProjects } from '@/lib/projects';
import { constructMetadata } from '@/lib/seo';
import { Button } from '@/components/ui/button-ui';
import { Badge } from '@/components/ui/badge-ui';
import { Card } from '@/components/ui/card-ui';
import {
    ExternalLink,
    Github,
    ArrowLeft,
    ArrowRight,
    Calendar,
    User,
    AlertTriangle,
    CheckCircle2,
    Layers,
    Terminal,
    Cpu,
    Database,
    Globe,
    Layout,
    RefreshCw,
    Shield,
    Kanban,
    CreditCard,
    Repeat,
    Bell,
    BarChart3,
    CalendarClock,
    Search,
    Users,
    FileText,
    Palette,
    Monitor,
    Mail,
    Lock
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import {
    SiReact,
    SiNextdotjs,
    SiTypescript,
    SiNodedotjs,
    SiPostgresql,
    SiPrisma,
    SiTailwindcss,
    SiVercel,
    SiStripe,
    SiExpress,
    SiShadcnui,
    SiVite,
    SiZod,
    SiFramer,
    SiReactquery,
    SiI18Next,
    SiReacthookform
} from "react-icons/si";

import ProjectSlider from '@/components/ui/project-slider';

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
        return constructMetadata({ title: 'Proyecto no encontrado', description: 'Proyecto no encontrado' });
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

    const { previous, next } = getAdjacentProjects(slug);

    // Helper to render icons based on text map
    const getIcon = (name: string) => {
        switch (name.toLowerCase()) {
            case 'frontend': return <Layout className="h-5 w-5" />;
            case 'backend': return <Terminal className="h-5 w-5" />;
            case 'database': return <Database className="h-5 w-5" />;
            case 'infrastructure': return <Globe className="h-5 w-5" />;
            case 'state': return <RefreshCw className="h-5 w-5" />;
            default: return <Cpu className="h-5 w-5" />;
        }
    };

    const getFeatureIcon = (iconName: string | undefined) => {
        switch (iconName?.toLowerCase()) {
            case 'kanban': return <Kanban className="h-4 w-4" />;
            case 'shield': return <Shield className="h-4 w-4" />;
            case 'calendar': return <Calendar className="h-4 w-4" />;
            case 'calendar-sync': return <CalendarClock className="h-4 w-4" />;
            case 'credit-card': return <CreditCard className="h-4 w-4" />;
            case 'repeat': return <Repeat className="h-4 w-4" />;
            case 'globe': return <Globe className="h-4 w-4" />;
            case 'bell': return <Bell className="h-4 w-4" />;
            case 'chart': return <BarChart3 className="h-4 w-4" />;
            case 'search': return <Search className="h-4 w-4" />;
            case 'users': return <Users className="h-4 w-4" />;
            case 'file': return <FileText className="h-4 w-4" />;
            case 'palette': return <Palette className="h-4 w-4" />;
            case 'monitor': return <Monitor className="h-4 w-4" />;
            case 'priority': return <AlertTriangle className="h-4 w-4" />;
            default: return <Layers className="h-4 w-4" />;
        }
    };

    const getTechIcon = (techIcon: string | undefined) => {
        const className = "h-5 w-5";
        switch (techIcon?.toLowerCase()) {
            case 'react': return <SiReact className={className} />;
            case 'nextjs': return <SiNextdotjs className={className} />;
            case 'typescript': return <SiTypescript className={className} />;
            case 'nodejs': return <SiNodedotjs className={className} />;
            case 'postgresql': return <SiPostgresql className={className} />;
            case 'prisma': return <SiPrisma className={className} />;
            case 'tailwindcss': return <SiTailwindcss className={className} />;
            case 'vercel': return <SiVercel className={className} />;
            case 'stripe': return <SiStripe className={className} />;
            case 'shadcn': return <SiShadcnui className={className} />;
            case 'express': return <SiExpress className={className} />;
            case 'vite': return <SiVite className={className} />;
            case 'zod': return <SiZod className={className} />;
            case 'framer': return <SiFramer className={className} />;
            case 'reactquery': return <SiReactquery className={className} />;
            case 'i18next': return <SiI18Next className={className} />;
            case 'authjs': return <Lock className={className} />;
            case 'resend': return <Mail className={className} />;
            case 'hookform': return <SiReacthookform className={className} />;
            case 'globe': return <Globe className={className} />;
            default: return null;
        }
    }

    return (
        <article className="min-h-screen bg-background pt-40 sm:pt-40 pb-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1600px]">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

                    {/* Left Sidebar (Sticky) */}
                    <aside className="lg:col-span-2 hidden lg:block">
                        <div className="sticky top-32 space-y-8">
                            <div>
                                <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">En esta página</h3>
                                <nav className="flex flex-col space-y-3">
                                    {['Resumen', 'El Problema', 'La Solución', 'Stack Tecnológico', 'Retos Técnicos'].map((item) => (
                                        <a
                                            key={item}
                                            href={`#${item.toLowerCase().replace(/ /g, '-')}`}
                                            className="text-sm text-muted-foreground hover:text-primary transition-colors border-l-2 border-transparent hover:border-primary pl-4 -ml-[2px]"
                                        >
                                            {item}
                                        </a>
                                    ))}
                                </nav>
                            </div>

                            <div className="space-y-6 pt-6 border-t border-border">
                                {project.timeline && (
                                    <div>
                                        <h4 className="flex items-center text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2 gap-2">
                                            <Calendar className="h-3 w-3" /> Cronología
                                        </h4>
                                        <p className="text-sm font-medium text-foreground">{project.timeline}</p>
                                    </div>
                                )}
                                {project.role && (
                                    <div>
                                        <h4 className="flex items-center text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2 gap-2">
                                            <User className="h-3 w-3" /> Rol
                                        </h4>
                                        <p className="text-sm font-medium text-foreground">{project.role}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <div className="lg:col-span-10 space-y-20">

                        {/* Header & Hero */}
                        <section id="resumen" className="space-y-8">
                            <div className="space-y-6">
                                <div className="flex items-center gap-3">
                                    {project.version && (
                                        <Badge variant="outline" className="text-primary border-primary/30 bg-primary/5 uppercase tracking-wider font-bold h-7">
                                            PRODUCTO SAAS {project.version}
                                        </Badge>
                                    )}
                                </div>
                                <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground leading-[1.1]">
                                    {project.title}
                                </h1>
                                <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
                                    {project.description}
                                </p>
                                <div className="flex flex-wrap gap-4 pt-2">
                                    {project.link && (
                                        <Button asChild size="lg" className="h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8">
                                            <Link href={project.link} target="_blank">
                                                Ver Demo <ArrowRight className="ml-2 h-4 w-4" />
                                            </Link>
                                        </Button>
                                    )}
                                    {project.github && (
                                        <Button asChild variant="outline" size="lg" className="h-12 border-border text-foreground hover:bg-muted font-medium px-8">
                                            <Link href={project.github} target="_blank">
                                                <Github className="mr-2 h-4 w-4" /> Repositorio
                                            </Link>
                                        </Button>
                                    )}
                                </div>
                            </div>

                            {/* Mobile Metadata & Navigation */}
                            <div className="flex flex-col gap-6 lg:hidden border-y border-border py-6">
                                <div className="flex flex-wrap gap-8">
                                    {project.timeline && (
                                        <div>
                                            <h4 className="flex items-center text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2 gap-2">
                                                <Calendar className="h-3 w-3" /> Cronología
                                            </h4>
                                            <p className="text-sm font-medium text-foreground">{project.timeline}</p>
                                        </div>
                                    )}
                                    {project.role && (
                                        <div>
                                            <h4 className="flex items-center text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2 gap-2">
                                                <User className="h-3 w-3" /> Rol
                                            </h4>
                                            <p className="text-sm font-medium text-foreground">{project.role}</p>
                                        </div>
                                    )}
                                </div>
                                <div className="flex flex-wrap gap-3 overflow-x-auto pb-2 no-scrollbar mask-gradient">
                                    {['Resumen', 'El Problema', 'La Solución', 'Stack Tecnológico', 'Retos Técnicos'].map((item) => (
                                        <a
                                            key={item}
                                            href={`#${item.toLowerCase().replace(/ /g, '-')}`}
                                            className="px-4 py-2 rounded-full text-xs font-medium bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors whitespace-nowrap"
                                        >
                                            {item}
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {/* Hero Image Area */}
                            <div className="rounded-xl overflow-hidden shadow-2xl bg-card">
                                {(project.gallery && project.gallery.length > 0) ? (
                                    <ProjectSlider images={project.gallery} />
                                ) : project.image ? (
                                    <ProjectSlider images={[project.image]} />
                                ) : (
                                    <div className="aspect-video w-full bg-secondary/50 flex items-center justify-center border border-border/50">
                                        <div className="text-center p-12">
                                            <Layers className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                                            <p className="text-muted-foreground">Imagen no disponible</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </section>

                        {/* Problem Section */}
                        {project.problem && (
                            <section id="el-problema" className="grid md:grid-cols-[200px_1fr] gap-8 border-t border-border pt-16">
                                <div>
                                    <div className="h-10 w-10 rounded-lg bg-destructive/10 flex items-center justify-center mb-4">
                                        <AlertTriangle className="h-5 w-5 text-destructive" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-foreground">El Problema</h2>
                                </div>
                                <div className="space-y-6">
                                    <p className="text-lg text-muted-foreground leading-relaxed">
                                        {project.problem.description}
                                    </p>
                                    {project.problem.painPoints && (
                                        <ul className="space-y-3">
                                            {project.problem.painPoints.map((point, i) => (
                                                <li key={i} className="flex items-start gap-3">
                                                    <span className="flex-shrink-0 h-6 w-6 mt-0.5 rounded-full bg-destructive/10 flex items-center justify-center text-xs text-destructive font-bold">✕</span>
                                                    <span className="text-muted-foreground">{point}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </section>
                        )}

                        {/* Solution Section */}
                        {project.solution && (
                            <section id="la-solución" className="grid md:grid-cols-[200px_1fr] gap-8 border-t border-border pt-16">
                                <div>
                                    <div className="h-10 w-10 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-4">
                                        <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-foreground">La Solución</h2>
                                </div>
                                <div className="space-y-8">
                                    <p className="text-lg text-muted-foreground leading-relaxed">
                                        {project.solution.description}
                                    </p>

                                    <div className="grid sm:grid-cols-2 gap-4">
                                        {project.solution.features?.map((feature, i) => (
                                            <Card key={i} className="p-5 bg-card border-border hover:border-primary/30 transition-colors">
                                                <div className="h-8 w-8 rounded bg-primary/10 flex items-center justify-center mb-3 text-primary">
                                                    {getFeatureIcon(feature.icon)}
                                                </div>
                                                <h3 className="font-bold text-foreground mb-2">{feature.title}</h3>
                                                <p className="text-sm text-muted-foreground leading-relaxed">
                                                    {feature.description}
                                                </p>
                                                {feature.details && feature.details.length > 0 && (
                                                    <ul className="mt-4 space-y-2 border-t border-border/50 pt-4">
                                                        {feature.details.map((detail, idx) => (
                                                            <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground/90">
                                                                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                                                                <span className="leading-relaxed">{detail}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </Card>
                                        ))}
                                    </div>
                                </div>
                            </section>
                        )}

                        {/* Tech Stack */}
                        {project.techStack && (
                            <section id="stack-tecnológico" className="space-y-8 border-t border-border pt-16">
                                <h2 className="text-2xl font-bold text-foreground">Stack Tecnológico</h2>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                    {project.techStack.map((tech, i) => (
                                        <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-secondary/30 border border-border/50">
                                            <div className="p-2 rounded-md bg-background shadow-sm text-primary">
                                                {tech.icon ? getTechIcon(tech.icon) : getIcon(tech.category)}
                                            </div>
                                            <div>
                                                <p className="font-bold text-foreground text-sm">{tech.name}</p>
                                                <p className="text-xs text-muted-foreground">{tech.category}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Challenges Section */}
                        {project.challenges && (
                            <section id="retos-técnicos" className="space-y-12 border-t border-border pt-16">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                        <Shield className="h-5 w-5 text-primary" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-foreground">Retos Técnicos</h2>
                                </div>

                                <div className="space-y-12">
                                    {project.challenges.map((challenge, i) => (
                                        <div key={i} className="grid lg:grid-cols-2 gap-8 items-start">
                                            <div className="space-y-4">
                                                <h3 className="text-xl font-bold text-foreground">{challenge.title}</h3>
                                                <p className="text-muted-foreground leading-relaxed">
                                                    {challenge.description}
                                                </p>
                                            </div>
                                            {challenge.codeSnippet && (
                                                <div className="bg-card rounded-xl border border-border overflow-hidden shadow-2xl">
                                                    <div className="flex items-center justify-between px-4 py-3 bg-muted/50 border-b border-border">
                                                        <div className="flex items-center gap-2">
                                                            <div className="flex gap-1.5">
                                                                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                                                                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                                                                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                                                            </div>
                                                        </div>
                                                        <span className="text-xs text-gray-500 font-mono">{challenge.codeSnippet.fileName}</span>
                                                    </div>
                                                    <div className="p-4 overflow-x-auto text-sm font-mono leading-relaxed text-gray-300">
                                                        <pre>{challenge.codeSnippet.code}</pre>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Footer Navigation */}
                        <div className="flex justify-between border-t border-border pt-16 gap-6">
                            {previous ? (
                                <Link
                                    href={`/projects/${previous.slug}`}
                                    className="group flex flex-col items-start gap-1"
                                >
                                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest group-hover:text-primary transition-colors">Proyecto Anterior</span>
                                    <h4 className="text-lg font-bold text-foreground flex items-center gap-2 group-hover:underline">
                                        <ArrowLeft className="h-4 w-4" /> {previous.title}
                                    </h4>
                                </Link>
                            ) : <div></div>}

                            {next ? (
                                <Link
                                    href={`/projects/${next.slug}`}
                                    className="group flex flex-col items-end gap-1 text-right"
                                >
                                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest group-hover:text-primary transition-colors">Siguiente Proyecto</span>
                                    <h4 className="text-lg font-bold text-foreground flex items-center gap-2 group-hover:underline">
                                        {next.title} <ArrowRight className="h-4 w-4" />
                                    </h4>
                                </Link>
                            ) : <div></div>}
                        </div>

                    </div>
                </div>
            </div>
        </article>
    );
}
