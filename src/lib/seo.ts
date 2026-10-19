import type { Metadata } from 'next';
import { SeoConfig } from '@/types';
import { i18n, type Locale } from '@/i18n-config';

export const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://portfolio-adrian-lastra.vercel.app';
export const DEFAULT_OG_IMAGE = '/images/profile/adrian.webp';

const OG_LOCALE: Record<string, string> = { es: 'es_ES', en: 'en_US' };

/** URL canónica + alternates por idioma (hreflang) de una ruta sin prefijo de idioma. */
export function localizedAlternates(lang: Locale, path = '') {
    const languages: Record<string, string> = {};
    for (const l of i18n.locales) languages[l] = `${BASE_URL}/${l}${path}`;
    languages['x-default'] = `${BASE_URL}/${i18n.defaultLocale}${path}`;
    return { canonical: `${BASE_URL}/${lang}${path}`, languages };
}

/** Metadatos de una página interior: título, descripción, canonical, hreflang, Open Graph y Twitter. */
export function pageMetadata({
    lang, path = '', title, description, image = DEFAULT_OG_IMAGE, type = 'website',
}: { lang: Locale; path?: string; title: string; description: string; image?: string; type?: 'website' | 'article' }): Metadata {
    const url = `${BASE_URL}/${lang}${path}`;
    const img = image.startsWith('http') ? image : `${BASE_URL}${image}`;
    return {
        title,
        description,
        alternates: localizedAlternates(lang, path),
        openGraph: { title, description, url, locale: OG_LOCALE[lang] ?? 'es_ES', type, images: [{ url: img }] },
        twitter: { card: 'summary_large_image', title, description, images: [img] },
    };
}

export function constructMetadata({
    title,
    description,
    url = BASE_URL,
    image = DEFAULT_OG_IMAGE,
}: SeoConfig): Metadata {
    return {
        metadataBase: new URL(url),
        title: {
            default: title,
            template: `%s | ${title}`,
        },
        description,
        openGraph: {
            title,
            description,
            url,
            images: [{ url: image }],
            siteName: title,
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [image],
        },
        robots: {
            index: true,
            follow: true,
            googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
        },
    };
}
