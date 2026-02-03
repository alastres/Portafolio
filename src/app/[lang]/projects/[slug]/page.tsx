import { notFound } from 'next/navigation';
import { projects, getProjectBySlug, getAdjacentProjects } from '@/lib/projects';
import { constructMetadata } from '@/lib/seo';
import ProjectDetail from '@/components/projects/ProjectDetail';
import { getDictionary } from '@/lib/get-dictionary';
import type { Locale } from '@/i18n-config';
import { i18n } from '@/i18n-config';

interface ProjectPageProps {
    params: Promise<{ slug: string; lang: Locale }>;
}

export async function generateStaticParams() {
    const params = [];
    for (const locale of i18n.locales) {
        for (const project of projects) {
            params.push({ lang: locale, slug: project.slug });
        }
    }
    return params;
}

function resolveTranslation(key: string, translations: Record<string, unknown>): string {
    const keys = key.split('.');
    let result: unknown = translations;
    for (const k of keys) {
        if (result && typeof result === 'object' && k in (result as Record<string, unknown>)) {
            result = (result as Record<string, unknown>)[k];
        } else {
            return key; // Return key if not found
        }
    }
    return typeof result === 'string' ? result : key;
}

export async function generateMetadata({ params }: ProjectPageProps) {
    const { slug, lang } = await params;
    const project = getProjectBySlug(slug);

    if (!project) {
        return constructMetadata({ title: 'Proyecto no encontrado', description: 'Proyecto no encontrado' });
    }

    const dict = await getDictionary(lang);
    const title = resolveTranslation(project.title, dict as Record<string, unknown>);
    const description = resolveTranslation(project.description, dict as Record<string, unknown>);

    return constructMetadata({
        title: title,
        description: description,
    });
}

export default async function ProjectPage({ params }: ProjectPageProps) {
    const { slug, lang } = await params;
    const project = getProjectBySlug(slug);

    if (!project) {
        notFound();
    }

    const { previous, next } = getAdjacentProjects(slug);
    const dict = await getDictionary(lang);

    return <ProjectDetail project={project} previous={previous} next={next} lang={lang} dict={dict} />;
}
