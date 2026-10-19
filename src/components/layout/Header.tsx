'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button-ui';
import { Terminal, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { EASE_OUT } from '@/lib/motion';
import { LanguageSwitcher } from '@/components/language-switcher';
import type { Locale } from '@/i18n-config';

interface HeaderProps {
    lang: Locale;
    dict: any;
}

const menuVariants: Variants = {
    hidden: { opacity: 0, y: -12 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.25, ease: EASE_OUT, staggerChildren: 0.06, delayChildren: 0.05 },
    },
    exit: { opacity: 0, y: -12, transition: { duration: 0.18 } },
};

const menuItem: Variants = {
    hidden: { opacity: 0, x: -16 },
    show: { opacity: 1, x: 0, transition: { duration: 0.35, ease: EASE_OUT } },
    exit: { opacity: 0, transition: { duration: 0.1 } },
};

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

    const isActive = (href: string) =>
        !href.includes('#') && (pathname === href || (href !== `/${lang}` && pathname.startsWith(href)));

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
                                className={`relative text-sm font-medium transition-colors ${isActive(item.href) ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                            >
                                {item.label}
                                {isActive(item.href) && (
                                    <motion.span
                                        layoutId="nav-active"
                                        className="absolute inset-x-0 -bottom-1 h-px bg-primary"
                                        transition={{ duration: 0.35, ease: EASE_OUT }}
                                    />
                                )}
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
                            aria-expanded={mobileMenuOpen}
                        >
                            <AnimatePresence initial={false} mode="wait">
                                <motion.span
                                    key={mobileMenuOpen ? 'close' : 'open'}
                                    initial={{ opacity: 0, rotate: -90 }}
                                    animate={{ opacity: 1, rotate: 0 }}
                                    exit={{ opacity: 0, rotate: 90 }}
                                    transition={{ duration: 0.15 }}
                                    className="block"
                                >
                                    {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                                </motion.span>
                            </AnimatePresence>
                        </button>
                    </div>
                </div>


            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        variants={menuVariants}
                        initial="hidden"
                        animate="show"
                        exit="exit"
                        className="fixed inset-0 top-[80px] z-40 bg-background border-t border-border md:hidden flex flex-col p-6 overflow-y-auto min-h-screen"
                    >
                        <nav className="flex flex-col gap-6 mt-4">
                            {navItems.map((item) => (
                                <motion.div key={item.href} variants={menuItem}>
                                    <Link
                                        href={item.href}
                                        className="block text-lg font-medium text-muted-foreground hover:text-primary transition-colors py-2 border-b border-border/50"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {item.label}
                                    </Link>
                                </motion.div>
                            ))}
                            <motion.div variants={menuItem}>
                                <Link
                                    href={`/${lang}/contact`}
                                    className="block text-lg font-medium text-primary hover:text-primary/80 transition-colors py-2"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {dict.header.contact}
                                </Link>
                            </motion.div>
                        </nav>


                    </motion.div>
                )}
            </AnimatePresence>


        </header>
    );
}
