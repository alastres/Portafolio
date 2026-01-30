import Link from 'next/link';
import Hero from '@/components/sections/Hero';
import ProjectsGrid from '@/components/sections/ProjectsGrid';
import { projects } from '@/lib/projects';
import { Button } from '@/components/ui/button-ui';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card-ui';
import { Code2, Database, Cloud, ArrowRight, Check } from 'lucide-react';

export default function Home() {
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
      <Hero />

      {/* Featured Projects */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex flex-col sm:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground mb-2">Proyectos destacados</h2>
              <p className="text-muted-foreground">
                Una selección de mis trabajos más recientes y complejos.
              </p>
            </div>
            <Link href="/projects" className="hidden sm:flex items-center text-sm font-semibold text-primary hover:text-primary/80 transition-colors">
              Ver todos los proyectos <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <ProjectsGrid projects={featuredProjects} />

          <div className="mt-12 text-center sm:hidden">
            <Button asChild variant="outline" className="text-primary border-primary/20 hover:bg-primary/10">
              <Link href="/projects">Ver todos los proyectos</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stack / Skills */}
      <section id="stack" className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <h2 className="text-3xl font-bold tracking-tight text-foreground mb-4">Stack / Skills</h2>
          <p className="text-muted-foreground mb-12 max-w-2xl">
            Las herramientas que utilizo para construir productos escalables.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {skills.map((category) => (
              <Card key={category.title} className="bg-card border-border hover:border-border/80 transition-colors">
                <CardHeader>
                  <div className="mb-4 bg-muted w-12 h-12 rounded-lg flex items-center justify-center border border-border">
                    {category.icon}
                  </div>
                  <CardTitle className="text-card-foreground text-lg">{category.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {category.items.map((item) => (
                      <li key={item} className="text-muted-foreground text-sm flex items-center">
                        <Check className="h-4 w-4 text-primary mr-3 shrink-0" />
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

      {/* Final CTA */}
      <section className="py-32 bg-secondary/10 relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
            ¿Listo para construir el siguiente gran producto?
          </h2>
          <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
            Actualmente tengo disponibilidad limitada para nuevos proyectos. Si buscas un partner técnico comprometido con la calidad, hablemos.
          </p>
          <Button asChild size="lg" className="h-14 px-8 text-lg bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20">
            <Link href="/contact">
              Iniciar Conversación <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
