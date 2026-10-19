import { MetadataRoute } from 'next';
import { i18n } from '@/i18n-config';
import { projects } from '@/lib/projects';
import { BASE_URL } from '@/lib/seo';

// Fecha fija por despliegue: cambia con cada build, no en cada petición.
const BUILD_DATE = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
    const routes = [
        { path: '', priority: 1 },
        { path: '/projects', priority: 0.9 },
        { path: '/about', priority: 0.7 },
        { path: '/contact', priority: 0.7 },
        ...projects.map((p) => ({ path: `/projects/${p.slug}`, priority: 0.8 })),
    ];

    return i18n.locales.flatMap((locale) =>
        routes.map(({ path, priority }) => ({
            url: `${BASE_URL}/${locale}${path}`,
            lastModified: BUILD_DATE,
            changeFrequency: 'monthly' as const,
            priority,
            alternates: {
                languages: Object.fromEntries(i18n.locales.map((l) => [l, `${BASE_URL}/${l}${path}`])),
            },
        }))
    );
}
