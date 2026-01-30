'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Breadcrumbs() {
    const pathname = usePathname();

    // Don't show on home page
    if (pathname === '/') return null;

    const segments = pathname.split('/').filter(Boolean);

    return (
        <nav aria-label="Breadcrumb" className="w-full border-t border-border/40 bg-background/50 backdrop-blur-sm">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-2">
                <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <li>
                        <Link
                            href="/"
                            className="flex items-center hover:text-foreground transition-colors"
                        >
                            <Home className="h-4 w-4" />
                            <span className="sr-only">Home</span>
                        </Link>
                    </li>

                    {segments.map((segment, index) => {
                        const href = `/${segments.slice(0, index + 1).join('/')}`;
                        const isLast = index === segments.length - 1;

                        // Format segment label: remove dashes, capitalize
                        let label = segment.replace(/-/g, ' ');
                        label = label.charAt(0).toUpperCase() + label.slice(1);

                        // Optional: Custom labels mapping
                        if (segment === 'about') label = 'Sobre mí';
                        if (segment === 'projects') label = 'Proyectos';
                        if (segment === 'contact') label = 'Contacto';

                        return (
                            <li key={href} className="flex items-center">
                                <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground/50" />
                                {isLast ? (
                                    <span
                                        className="font-medium text-foreground"
                                        aria-current="page"
                                    >
                                        {label}
                                    </span>
                                ) : (
                                    <Link
                                        href={href}
                                        className="hover:text-foreground transition-colors"
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
