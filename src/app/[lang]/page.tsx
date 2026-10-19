import type { Metadata } from 'next';
import HomeExperience from '@/components/home/HomeExperience';
import type { HomeProject } from '@/components/home/types';
import { projects } from '@/lib/projects';
import { getDictionary } from '@/lib/get-dictionary';
import type { Locale } from '@/i18n-config';
import { localizedAlternates } from '@/lib/seo';

const BASE = process.env.NEXT_PUBLIC_APP_URL || 'https://portfolio-adrian-lastra.vercel.app';

function resolveKey(key: string | undefined, dict: unknown): string {
    if (!key) return '';
    let result: unknown = dict;
    for (const k of key.split('.')) {
        result = (result as Record<string, unknown> | undefined)?.[k];
        if (!result) return key;
    }
    return typeof result === 'string' ? result : key;
}

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
    const { lang } = await params;
    const { pf } = await getDictionary(lang);
    const url = `${BASE}/${lang}`;
    return {
        title: { absolute: pf.meta.title },
        description: pf.meta.description,
        alternates: localizedAlternates(lang),
        openGraph: {
            title: pf.meta.title,
            description: pf.meta.description,
            url,
            locale: lang === 'es' ? 'es_ES' : 'en_US',
            type: 'website',
            images: [{ url: `${BASE}/images/profile/adrian.webp` }],
        },
        twitter: { card: 'summary', title: pf.meta.title, description: pf.meta.description },
    };
}

export default async function Home({ params }: { params: Promise<{ lang: Locale }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang);
    const c = dict.pf;

    const items: HomeProject[] = projects.map((p) => ({
        slug: p.slug,
        title: resolveKey(p.title, dict),
        description: resolveKey(p.description, dict),
        forWho: (c.cases.for as Record<string, string>)[p.slug] ?? '',
        problem: resolveKey(p.problem?.description, dict),
        solution: resolveKey(p.solution?.description, dict),
        role: resolveKey(p.role, dict),
        timeline: resolveKey(p.timeline, dict),
        tags: p.tags.map((t) => (t === 'typescript' ? 'TypeScript' : t)),
        image: p.image ?? p.gallery?.[0] ?? '',
        link: p.link,
        github: p.github,
    }));

    // Datos estructurados: orientados a los problemas que resuelve, no a la tecnología.
    const url = `${BASE}/${lang}`;
    const photo = `${BASE}/images/profile/adrian.webp`;
    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Person',
                '@id': `${BASE}/#adrian`,
                name: 'Adrian Roidel Lastres Marinas',
                url,
                image: photo,
                jobTitle: c.role,
                address: { '@type': 'PostalAddress', addressLocality: 'Albacete', addressRegion: 'Castilla-La Mancha', addressCountry: 'ES' },
                sameAs: ['https://github.com/alastres', 'https://linkedin.com/in/alas3s'],
                knowsAbout: c.problems.items.map((i) => i.build),
            },
            {
                '@type': 'ProfessionalService',
                '@id': `${BASE}/#service`,
                name: 'Adrian Roidel',
                url,
                image: photo,
                description: c.meta.description,
                founder: { '@id': `${BASE}/#adrian` },
                areaServed: [{ '@type': 'City', name: 'Albacete' }, { '@type': 'Country', name: 'España' }],
                hasOfferCatalog: {
                    '@type': 'OfferCatalog',
                    name: c.problems.title,
                    itemListElement: c.problems.items.map((i) => ({
                        '@type': 'Offer',
                        itemOffered: { '@type': 'Service', name: i.build, description: i.how },
                    })),
                },
            },
            {
                '@type': 'FAQPage',
                mainEntity: c.problems.items.map((i) => ({
                    '@type': 'Question',
                    name: i.q,
                    acceptedAnswer: { '@type': 'Answer', text: i.how },
                })),
            },
        ],
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
            />
            <HomeExperience lang={lang} c={c} projects={items} />
        </>
    );
}
