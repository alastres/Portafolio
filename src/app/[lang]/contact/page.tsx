import ContactClientPage from '@/components/pages/ContactClientPage';
import { getDictionary } from '@/lib/get-dictionary';
import type { Locale } from '@/i18n-config';

export default async function ContactPage({
    params,
}: {
    params: Promise<{ lang: Locale }>;
}) {
    const { lang } = await params;
    const dict = await getDictionary(lang);

    return <ContactClientPage lang={lang} dict={dict} />;
}
