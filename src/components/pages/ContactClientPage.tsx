'use client';

import { Button } from '@/components/ui/button-ui';
import { Card, CardContent } from '@/components/ui/card-ui';
import { Input } from '@/components/ui/input-ui';
import { Textarea } from '@/components/ui/textarea-ui';
import { Mail, Github, Linkedin, Twitter, ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';
import AnimatedBackgroundVectors from '@/components/ui/animated-background-vectors';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { toast } from 'sonner';
import type { Locale } from '@/i18n-config';

interface ContactClientPageProps {
    lang: Locale;
    dict: any;
}

export default function ContactClientPage({ lang, dict }: ContactClientPageProps) {
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message'),
        };

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                toast.success(dict.contact.success || 'Mensaje enviado', {
                    description: dict.contact.success_desc || 'Gracias por contactarme. Te responderé pronto.',
                });
                (e.target as HTMLFormElement).reset();
            } else {
                toast.error(dict.contact.error || 'Error', {
                    description: dict.contact.error_desc || 'Por favor, inténtalo de nuevo más tarde.',
                });
            }
        } catch (error) {
            toast.error(dict.contact.error || 'Error', {
                description: dict.contact.error_desc || 'Por favor, inténtalo de nuevo más tarde.',
            });
        } finally {
            setIsLoading(false);
        }
    }

    const socialLinks = [
        { icon: Mail, label: dict.contact.email || 'Email', href: 'mailto:adrian47388@gmail.com', username: 'adrian47388@gmail.com' },
        { icon: Github, label: 'GitHub', href: 'https://github.com/alastres', username: '@alastres' },
        { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/in/adrian-matos', username: 'Adrian Matos' },
        { icon: Twitter, label: 'Twitter', href: 'https://twitter.com/alastres_', username: '@alastres_' },
    ];

    return (
        <section className="py-24 sm:py-32 pt-32 sm:pt-40 min-h-screen relative overflow-hidden">
            <AnimatedBackgroundVectors />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl relative z-10">

                {/* Header Section */}
                <div className="text-center mb-16 space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-block px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-[0.2em] uppercase"
                    >
                        {dict.contact.badge || 'Contacto'}
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter text-foreground leading-[1.1]"
                    >
                        {dict.contact.page_title_part1 || 'Construyamos un producto'} <br className="hidden sm:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-600 to-sky-600">
                            {dict.contact.page_title_part2 || 'con impacto real'}
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
                    >
                        {dict.contact.page_desc_part1}
                        <span className="font-bold text-foreground underline decoration-primary/50 hover:decoration-primary transition-colors cursor-pointer">
                            {dict.contact.page_desc_highlight}
                        </span>
                    </motion.p>
                </div>

                {/* Contact Form */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <Card className="border-border/50 backdrop-blur-sm bg-background/50 shadow-xl">
                        <CardContent className="p-8 sm:p-12">
                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label htmlFor="name" className="text-sm font-bold text-foreground uppercase tracking-wide">
                                            {dict.contact.name_label || 'Nombre'}
                                        </label>
                                        <Input
                                            id="name"
                                            name="name"
                                            type="text"
                                            required
                                            placeholder={dict.contact.name_placeholder || 'Tu nombre'}
                                            className="border-border/50 focus:border-primary transition-colors bg-background/50 backdrop-blur-sm"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-sm font-bold text-foreground uppercase tracking-wide">
                                            {dict.contact.email_label || 'Email'}
                                        </label>
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            required
                                            placeholder={dict.contact.email_placeholder || 'tu@email.com'}
                                            className="border-border/50 focus:border-primary transition-colors bg-background/50 backdrop-blur-sm"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-sm font-bold text-foreground uppercase tracking-wide">
                                        {dict.contact.message_label || 'Mensaje'}
                                    </label>
                                    <Textarea
                                        id="message"
                                        name="message"
                                        required
                                        rows={6}
                                        placeholder={dict.contact.message_placeholder || 'Cuéntame sobre tu proyecto...'}
                                        className="border-border/50 focus:border-primary transition-colors resize-none bg-background/50 backdrop-blur-sm"
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                            {dict.contact.sending || 'Enviando...'}
                                        </>
                                    ) : (
                                        <>
                                            {dict.contact.send_btn || 'Enviar mensaje'}
                                            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Social Links */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-16"
                >
                    <h2 className="text-2xl font-black text-foreground mb-8 text-center">
                        {dict.contact.or_connect || 'O conéctate conmigo en'}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {socialLinks.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={cn(
                                    "group flex items-center gap-4 p-6 rounded-xl",
                                    "border border-border/50 hover:border-primary/50",
                                    "bg-background/30 hover:bg-background/50 backdrop-blur-sm",
                                    "transition-all duration-300",
                                    "hover:shadow-lg hover:-translate-y-1"
                                )}
                            >
                                <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                                    <link.icon className="h-6 w-6 text-primary" />
                                </div>
                                <div className="flex-1">
                                    <div className="font-bold text-foreground">{link.label}</div>
                                    <div className="text-sm text-muted-foreground">{link.username}</div>
                                </div>
                                <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                            </Link>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
