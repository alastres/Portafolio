import { notFound } from 'next/navigation';
import { projects, getProjectBySlug, getAdjacentProjects } from '@/lib/projects';
import { constructMetadata } from '@/lib/seo';
import ProjectDetail from '@/components/projects/ProjectDetail';
import esTranslations from '@/locales/es/translation.json';

interface ProjectPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return projects.map((project) => ({
        slug: project.slug,
    }));
}

function resolveTranslation(key: string, translations: any): string {
    const keys = key.split('.');
    let result = translations;
    for (const k of keys) {
        if (result && typeof result === 'object' && k in result) {
            result = result[k];
        } else {
            return key; // Return key if not found
        }
    }
    return typeof result === 'string' ? result : key;
}

export async function generateMetadata({ params }: ProjectPageProps) {
    const { slug } = await params;
    const project = getProjectBySlug(slug);

    if (!project) {
        return constructMetadata({ title: 'Proyecto no encontrado', description: 'Proyecto no encontrado' });
    }

    // Default to Spanish for SEO metadata on server side as it is the fallback language
    const title = resolveTranslation(project.title, esTranslations);
    const description = resolveTranslation(project.description, esTranslations);

    return constructMetadata({
        title: title,
        description: description,
    });
}

export default async function ProjectPage({ params }: ProjectPageProps) {
    const { slug } = await params;
    const project = getProjectBySlug(slug);

    if (!project) {
        notFound();
    }

    const { previous, next } = getAdjacentProjects(slug);

    return <ProjectDetail project={project} previous={previous} next={next} />;
}
