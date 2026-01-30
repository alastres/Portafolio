import { Metadata } from 'next';
import { SeoConfig } from '@/types';

export function constructMetadata({
    title,
    description,
    url = 'https://example.com',
    image = '/og-image.jpg',
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
            images: [
                {
                    url: image,
                },
            ],
            siteName: title,
            locale: 'en_US',
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
        },
    };
}
