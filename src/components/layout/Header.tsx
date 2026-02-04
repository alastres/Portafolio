'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button-ui';
import { Terminal, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { LanguageSwitcher } from '@/components/language-switcher';
import type { Locale } from '@/i18n-config';

interface HeaderProps {
    lang: Locale;
    dict: any;
}

export default function Header({ lang, dict }: HeaderProps) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    const navItems = [
        { label: dict.header.home, href: `/${lang}` },
        { label: dict.header.value, href: `/${lang}/#propuesta-valor` },
        { label: dict.header.projects, href: `/${lang}/projects` },
        { label: 'Stack', href: `/${lang}/#stack` },
        { label: dict.header.about, href: `/${lang}/about` },
    ];

    // Close mobile menu when route changes
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMobileMenuOpen(false);
    }, [pathname]);

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [mobileMenuOpen]);

    return (
        <header className="fixed top-0 z-50 w-full bg-background/40 backdrop-blur-xl border-b border-border/40 shadow-sm supports-[backdrop-filter]:bg-background/40 transition-all duration-300">
            <div className="relative">
                <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 max-w-7xl py-4">

                    {/* Logo */}
                    <div className="flex items-center gap-2 z-50 relative">
                        <div className="bg-primary/10 p-2 rounded-lg border border-primary/20">
                            <Terminal className="h-5 w-5 text-primary" />
                        </div>
                        <Link href={`/${lang}`} className="text-xl font-bold tracking-tight text-foreground">
                            Adrian R.L.M
                        </Link>
                    </div>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8 bg-background/50 px-6 py-2 rounded-full border border-border/50 backdrop-blur-sm shadow-sm ring-1 ring-border/20">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    {/* CTA & Mobile Toggle */}
                    <div className="flex items-center gap-4 z-50 relative">
                        <LanguageSwitcher currentLang={lang} />
                        <Button asChild size="sm" className="hidden md:inline-flex bg-primary hover:bg-primary/90 text-primary-foreground border-0 shadow-lg shadow-primary/20">
                            <Link href={`/${lang}/contact`}>{dict.header.contact}</Link>
                        </Button>

                        {/* Mobile Toggle Button */}
                        <button
                            className="md:hidden p-2 text-foreground hover:bg-muted rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>


            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 top-[80px] z-40 bg-background border-t border-border md:hidden flex flex-col p-6 overflow-y-auto min-h-screen"
                    >
                        <nav className="flex flex-col gap-6 mt-4">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="text-lg font-medium text-muted-foreground hover:text-primary transition-colors py-2 border-b border-border/50"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {item.label}
                                </Link>
                            ))}
                            <Link
                                href={`/${lang}/contact`}
                                className="text-lg font-medium text-primary hover:text-primary/80 transition-colors py-2"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {dict.header.contact}
                            </Link>
                        </nav>


                    </motion.div>
                )}
            </AnimatePresence>


        </header>
    );
}
