import ProjectsGrid from '@/components/sections/ProjectsGrid';
import { projects } from '@/lib/projects';

export default function ProjectsPage() {
    return (
        <div className="relative min-h-screen w-full bg-background overflow-hidden transition-colors duration-500">
            {/* Ambient Background Effects - Theme Aware */}
            <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-primary/5 via-primary/5 to-transparent pointer-events-none dark:from-blue-900/10 dark:via-purple-900/5" />
            <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none mix-blend-multiply dark:mix-blend-normal" />
            <div className="absolute bottom-[10%] left-[-10%] w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-multiply dark:mix-blend-normal" />

            <section className="relative py-32 sm:py-40">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <header className="mb-32 text-center md:text-center max-w-4xl mx-auto">
                        <div className="inline-block mb-4 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-[0.2em] uppercase">
                            Portfolio 2024
                        </div>
                        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter text-foreground mb-8 leading-[0.9]">
                            Journey Through <br className="hidden sm:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-600 to-sky-600 dark:from-blue-400 dark:via-cyan-400 dark:to-sky-400">Innovation</span>
                        </h1>
                        <p className="text-xl sm:text-2xl text-muted-foreground font-light leading-relaxed max-w-2xl mx-auto">
                            Exploring the intersection of scalable architecture and human-centric design through a series of digital milestones.
                        </p>
                    </header>

                    <ProjectsGrid projects={projects} />
                </div>
            </section>
        </div>
    );
}
