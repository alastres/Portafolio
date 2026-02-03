'use client';

import { I18nextProvider } from 'react-i18next';
import i18n from '@/lib/i18n';
import { useEffect, useState } from 'react';

export default function I18nProvider({ children }: { children: React.ReactNode }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        // Prevent hydration mismatch by rendering plain children or loading state initially
        // or just render children without translation (text keys might show briefly)
        // Ideally we render a loader or just children if we want SEO to be default language (SSR).
        // Since this is client-only i18n for now, keys might flash if we don't handle it.
        // But for simplicity, we return children.
        return <>{children}</>;
    }

    return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
