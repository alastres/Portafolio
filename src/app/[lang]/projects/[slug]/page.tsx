import { notFound } from 'next/navigation';
import { projects, getProjectBySlug, getAdjacentProjects } from '@/lib/projects';
import { constructMetadata, pageMetadata, BASE_URL } from '@/lib/seo';
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

    const image = project.image ?? project.gallery?.[0];
    return pageMetadata({ lang, path: `/projects/${slug}`, title, description, image, type: 'article' });
}

export default async function ProjectPage({ params }: ProjectPageProps) {
    const { slug, lang } = await params;
    const project = getProjectBySlug(slug);

    if (!project) {
        notFound();
    }

    const { previous, next } = getAdjacentProjects(slug);
    const dict = await getDictionary(lang);

    const t = (k: string) => resolveTranslation(k, dict as Record<string, unknown>);
    const url = `${BASE_URL}/${lang}/projects/${slug}`;
    const img = project.image ?? project.gallery?.[0];
    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'CreativeWork',
                '@id': `${url}#project`,
                name: t(project.title),
                description: t(project.description),
                url,
                inLanguage: lang,
                image: img ? `${BASE_URL}${img}` : undefined,
                author: { '@type': 'Person', name: 'Adrian Roidel Lastres Marinas', url: `${BASE_URL}/${lang}` },
                keywords: project.tags.join(', '),
                ...(project.link ? { sameAs: [project.link] } : {}),
            },
            {
                '@type': 'BreadcrumbList',
                itemListElement: [
                    { '@type': 'ListItem', position: 1, name: 'Portfolio', item: `${BASE_URL}/${lang}` },
                    { '@type': 'ListItem', position: 2, name: lang === 'es' ? 'Proyectos' : 'Projects', item: `${BASE_URL}/${lang}/projects` },
                    { '@type': 'ListItem', position: 3, name: t(project.title), item: url },
                ],
            },
        ],
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
            <ProjectDetail project={project} previous={previous} next={next} lang={lang} dict={dict} />
        </>
    );
}
