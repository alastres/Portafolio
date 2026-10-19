import type { Metadata } from 'next';
import ContactClientPage from '@/components/pages/ContactClientPage';
import { getDictionary } from '@/lib/get-dictionary';
import { pageMetadata } from '@/lib/seo';
import type { Locale } from '@/i18n-config';

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
    const { lang } = await params;
    const { contact: c } = await getDictionary(lang);
    return pageMetadata({
        lang,
        path: '/contact',
        title: `${c.badge} · ${c.page_title_part1} ${c.page_title_part2}`,
        description: `${c.page_desc_part1}${c.page_desc_highlight}`.replace(/\s+/g, ' ').trim(),
    });
}

export default async function ContactPage({
    params,
}: {
    params: Promise<{ lang: Locale }>;
}) {
    const { lang } = await params;
    const dict = await getDictionary(lang);

    return <ContactClientPage lang={lang} dict={dict} />;
}
