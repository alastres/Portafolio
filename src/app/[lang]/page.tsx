import Link from 'next/link';
import Hero from '@/components/sections/Hero';
import ProjectsGrid from '@/components/sections/ProjectsGrid';
import { projects } from '@/lib/projects';
import PropuestaValor from '@/components/sections/PropuestaValor';
import CTA from '@/components/sections/CTA';
import { Button } from '@/components/ui/button-ui';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card-ui';
import { Code2, Database, Cloud, ArrowRight } from 'lucide-react';
import { getDictionary } from '@/lib/get-dictionary';
import type { Locale } from '@/i18n-config';

export default async function Home({
    params,
}: {
    params: Promise<{ lang: Locale }>;
}) {
    const { lang } = await params;
    const dict = await getDictionary(lang);
    const featuredProjects = projects.slice(0, 2);

    const skills = [
        {
            title: 'Frontend Engineering',
            icon: <Code2 className="h-6 w-6 text-primary" />,
            items: ['React / Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
        },
        {
            title: 'Backend & Database',
            icon: <Database className="h-6 w-6 text-primary" />,
            items: ['Node.js / Express', 'PostgreSQL / Supabase', 'Redis', 'Python / Django'],
        },
        {
            title: 'DevOps & Cloud',
            icon: <Cloud className="h-6 w-6 text-primary" />,
            items: ['Docker', 'AWS (S3, Lambda)', 'CI/CD Pipelines', 'Vercel'],
        },
    ];

    return (
        <>
            <Hero lang={lang} dict={dict} />
            <PropuestaValor lang={lang} dict={dict} />

            {/* Featured Projects */}
            <section className="relative py-32 bg-muted/30 -mt-20 pt-32" style={{ clipPath: 'polygon(0 5rem, 100% 0, 100% 100%, 0 100%)' }}>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
                    <div className="flex flex-col sm:flex-row justify-between items-end mb-16">
                        <div className="relative">
                            <span className="absolute -top-6 -left-4 text-6xl text-primary/10 font-black -z-10 select-none">{dict.home.projects.number}</span>
                            <h2 className="text-4xl font-black tracking-tighter text-foreground mb-4 relative">{dict.home.projects.title}</h2>
                            <p className="text-xl text-muted-foreground font-light max-w-lg">
                                {dict.home.projects.description}
                            </p>
                        </div>
                        <Link href={`/${lang}/projects`} className="hidden sm:flex items-center text-sm font-bold tracking-widest uppercase text-primary hover:text-primary/80 transition-colors">
                            {dict.home.projects.view_all} <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </div>

                    <ProjectsGrid projects={featuredProjects} lang={lang} dict={dict} />

                    <div className="mt-16 text-center sm:hidden">
                        <Button asChild variant="ghost" className="text-primary hover:bg-primary/10 w-full">
                            <Link href={`/${lang}/projects`}>{dict.home.projects.view_full} <ArrowRight className="ml-2 h-4 w-4" /></Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Stack / Skills */}
            <section id="stack" className="py-32 bg-background relative -mt-20 pt-32" style={{ clipPath: 'polygon(0 0, 100% 5rem, 100% 100%, 0 100%)' }}>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <div className="text-center mb-20">
                        <span className="text-sm font-bold text-primary tracking-[0.3em] uppercase block mb-3">{dict.home.stack.label}</span>
                        <h2 className="text-4xl md:text-5xl font-black tracking-tight text-foreground mb-6">
                            {dict.home.stack.title}
                        </h2>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light">
                            {dict.home.stack.description}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                        {skills.map((category) => (
                            <Card key={category.title} className="bg-card border-neutral-200 dark:border-border hover:border-primary/30 transition-all hover:shadow-xl hover:-translate-y-1">
                                <CardHeader>
                                    <div className="mb-6 bg-primary/10 w-14 h-14 rounded-2xl flex items-center justify-center border border-primary/20">
                                        {category.icon}
                                    </div>
                                    <CardTitle className="text-card-foreground text-xl font-bold">{category.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-4">
                                        {category.items.map((item) => (
                                            <li key={item} className="text-muted-foreground flex items-center">
                                                <div className="h-1.5 w-1.5 rounded-full bg-primary/60 mr-3 shrink-0" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            <CTA lang={lang} dict={dict} />
        </>
    );
}
