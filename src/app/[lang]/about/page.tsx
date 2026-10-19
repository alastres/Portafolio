import type { Metadata } from 'next';
import AboutClientContent from '@/components/pages/AboutClientContent';
import { getDictionary } from '@/lib/get-dictionary';
import { pageMetadata } from '@/lib/seo';
import type { Locale } from '@/i18n-config';

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
    const { lang } = await params;
    const dict = await getDictionary(lang);
    return pageMetadata({
        lang,
        path: '/about',
        title: `${dict.pf.ui.about} · ${dict.pf.role}`,
        description: dict.about.hero.description,
    });
}

export default async function AboutPage({
    params,
}: {
    params: Promise<{ lang: Locale }>;
}) {
    const { lang } = await params;
    const dict = await getDictionary(lang);

    return <AboutClientContent lang={lang} dict={dict} />;
}
