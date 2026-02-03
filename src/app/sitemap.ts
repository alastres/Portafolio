import { MetadataRoute } from 'next';
import { i18n } from '@/i18n-config';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://portfolio-adrian-lastra.vercel.app';
    const lastModified = new Date();

    const routes = [
        '',
        '/about',
        '/projects',
        '/contact',
    ];

    const entries: MetadataRoute.Sitemap = [];

    for (const locale of i18n.locales) {
        for (const route of routes) {
            entries.push({
                url: `${baseUrl}/${locale}${route}`,
                lastModified,
                changeFrequency: 'monthly' as const,
                priority: route === '' ? 1 : 0.8,
            });
        }
    }

    return entries;
}
