import ProjectsGrid from '@/components/sections/ProjectsGrid';
import { projects } from '@/lib/projects';

export default function ProjectsPage() {
    return (
        <section className="py-24 sm:py-32 pt-32 sm:pt-40">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <header className="mb-16">
                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-6">Proyectos</h1>
                    <p className="text-xl text-gray-400 max-w-2xl">
                        Una colección de productos, experimentos y soluciones que he construido.
                    </p>
                </header>

                <ProjectsGrid projects={projects} />
            </div>
        </section>
    );
}
