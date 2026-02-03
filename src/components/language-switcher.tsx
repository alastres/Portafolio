'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Globe } from 'lucide-react';
import { i18n, type Locale } from '@/i18n-config';

interface LanguageSwitcherProps {
    currentLang: Locale;
}

export function LanguageSwitcher({ currentLang }: LanguageSwitcherProps) {
    const pathname = usePathname();

    const redirectedPathname = (locale: Locale) => {
        if (!pathname) return `/${locale}`;

        // Remove current locale from pathname
        const segments = pathname.split('/');
        const currentLocaleIndex = segments.findIndex(seg => i18n.locales.includes(seg as Locale));

        if (currentLocaleIndex !== -1) {
            segments[currentLocaleIndex] = locale;
        } else {
            segments.splice(1, 0, locale);
        }

        return segments.join('/') || `/${locale}`;
    };

    return (
        <div className="flex items-center gap-1 bg-background/50 px-2 py-1 rounded-full border border-border/50">
            <Globe className="h-4 w-4 text-muted-foreground mr-1" />
            {i18n.locales.map((locale) => {
                const isActive = currentLang === locale;
                return (
                    <Link
                        key={locale}
                        href={redirectedPathname(locale)}
                        className={`px-2 py-1 text-xs font-medium rounded-full transition-colors ${isActive
                                ? 'bg-primary text-primary-foreground'
                                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                            }`}
                    >
                        {locale.toUpperCase()}
                    </Link>
                );
            })}
        </div>
    );
}
