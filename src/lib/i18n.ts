'use client';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import resourcesToBackend from 'i18next-resources-to-backend';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .use(
        resourcesToBackend((language: string, namespace: string) =>
            import(`@/locales/${language}/${namespace}.json`)
        )
    )
    .init({
        fallbackLng: 'es',
        supportedLngs: ['en', 'es'],
        ns: ['translation'],
        defaultNS: 'translation',
        debug: process.env.NODE_ENV === 'development',
        interpolation: {
            escapeValue: false, // React already escapes values
        },
        detection: {
            order: ['localStorage', 'navigator'],
            caches: ['localStorage'],
        },
    });

export default i18n;
