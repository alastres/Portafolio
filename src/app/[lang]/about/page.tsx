import AboutClientContent from '@/components/pages/AboutClientContent';
import { getDictionary } from '@/lib/get-dictionary';
import type { Locale } from '@/i18n-config';

export default async function AboutPage({
    params,
}: {
    params: Promise<{ lang: Locale }>;
}) {
    const { lang } = await params;
    const dict = await getDictionary(lang);

    return <AboutClientContent lang={lang} dict={dict} />;
}
