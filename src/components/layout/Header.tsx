'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button-ui';
import { Terminal } from 'lucide-react';
import { useState, useEffect } from 'react';

const navItems = [
    { label: 'Proyectos', href: '/projects' },
    { label: 'Stack', href: '/#stack' },
    { label: 'Sobre mí', href: '/about' },
];

export default function Header() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`fixed top-0 z-50 w-full transition-all duration-300 ${scrolled ? 'bg-background/80 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
            <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 max-w-7xl">

                {/* Logo */}
                <div className="flex items-center gap-2">
                    <div className="bg-blue-500/10 p-2 rounded-lg border border-blue-500/20">
                        <Terminal className="h-5 w-5 text-blue-500" />
                    </div>
                    <Link href="/" className="text-xl font-bold tracking-tight text-white">
                        DevName
                    </Link>
                </div>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8 bg-white/5 px-6 py-2 rounded-full border border-white/5 backdrop-blur-sm">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                {/* CTA */}
                <div className="flex items-center gap-4">
                    <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-700 text-white border-0">
                        <Link href="/contact">Hablemos</Link>
                    </Button>
                </div>
            </div>
        </header>
    );
}
