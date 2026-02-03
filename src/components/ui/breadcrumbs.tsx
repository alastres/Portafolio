'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Locale } from '@/i18n-config';

interface BreadcrumbsProps {
    lang: Locale;
    dict: any;
}

export function Breadcrumbs({ lang, dict }: BreadcrumbsProps) {
    const pathname = usePathname();

    // Don't show on home page
    if (pathname === `/${lang}` || pathname === '/') return null;

    const segments = pathname.split('/').filter(Boolean);
    // Remove lang from segments
    const pathSegments = segments.filter(s => s !== lang && s !== 'es' && s !== 'en');

    // Don't show if no path segments
    if (pathSegments.length === 0) return null;

    return (
        <nav aria-label="Breadcrumb" className="w-full">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-2">
                <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <li>
                        <Link
                            href={`/${lang}`}
                            className="flex items-center hover:text-foreground transition-colors"
                        >
                            <Home className="h-4 w-4" />
                            <span className="sr-only">Home</span>
                        </Link>
                    </li>

                    {pathSegments.map((segment, index) => {
                        const href = `/${lang}/${pathSegments.slice(0, index + 1).join('/')}`;
                        const isLast = index === pathSegments.length - 1;

                        // Format segment label: remove dashes, capitalize
                        let label = segment.replace(/-/g, ' ');
                        label = label.charAt(0).toUpperCase() + label.slice(1);

                        // Use translations if available
                        if (segment === 'about') label = dict?.nav?.about || (lang === 'es' ? 'Sobre mí' : 'About');
                        if (segment === 'projects') label = dict?.nav?.projects || (lang === 'es' ? 'Proyectos' : 'Projects');
                        if (segment === 'contact') label = dict?.nav?.contact || (lang === 'es' ? 'Contacto' : 'Contact');

                        return (
                            <li key={href} className="flex items-center">
                                <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground/50" />
                                {isLast ? (
                                    <span
                                        className="font-medium text-foreground truncate max-w-[150px] sm:max-w-none block"
                                        aria-current="page"
                                    >
                                        {label}
                                    </span>
                                ) : (
                                    <Link
                                        href={href}
                                        className="hover:text-foreground transition-colors whitespace-nowrap"
                                    >
                                        {label}
                                    </Link>
                                )}
                            </li>
                        );
                    })}
                </ol>
            </div>
        </nav>
    );
}
