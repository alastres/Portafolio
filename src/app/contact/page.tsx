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
import { useTranslation, Trans } from 'react-i18next';

export default function ContactPage() {
    const { t } = useTranslation('translation');
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
                toast.success(t('contact.success'), {
                    description: t('contact.success_desc', 'Gracias por contactarme. Te responderé pronto.'),
                });
                (e.target as HTMLFormElement).reset();
            } else {
                toast.error(t('contact.error'), {
                    description: t('contact.error_desc', 'Por favor, inténtalo de nuevo más tarde.'),
                });
            }
        } catch (error) {
            toast.error(t('contact.error'), {
                description: t('contact.error_desc', 'Por favor, inténtalo de nuevo más tarde.'),
            });
        } finally {
            setIsLoading(false);
        }
    }

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
                        {t('contact.badge')}
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter text-foreground leading-[1.1]"
                    >
                        {/* 
                            title: "Construyamos un producto <1/> <2>con impacto real</2>" 
                            indices: 0=text, 1=<br/>, 2=<span>
                        */}
                        <Trans i18nKey="contact.page_title">
                            Construyamos un producto <br className="hidden sm:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-600 to-sky-600">
                                con impacto real
                            </span>
                        </Trans>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
                    >
                        <Trans i18nKey="contact.page_desc">
                            Colaboro en proyectos freelance y de consultoría, ayudando a transformar ideas en productos reales, escalables y alineados con objetivos de negocio.
                            <br className="hidden md:block" /> Si tienes un MVP, un producto SaaS o un sistema que necesita evolucionar, hablemos.
                        </Trans>
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="pt-4"
                    >
                        <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-4">{t('contact.direct_label')}</p>
                        <Link
                            href="mailto:adrian47388@gmail.com"
                            className="inline-flex items-center text-2xl md:text-3xl font-black text-foreground hover:text-primary transition-colors border-b-2 border-transparent hover:border-primary/50"
                        >
                            <Mail className="mr-3 h-6 w-6 md:h-8 md:w-8" />
                            adrian47388@gmail.com
                        </Link>
                    </motion.div>
                </div>

                {/* Social Cards */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20 max-w-5xl mx-auto"
                >
                    {[
                        {
                            icon: Github,
                            label: 'GitHub',
                            href: 'https://github.com/alastres',
                            desc: t('contact.social.github_desc')
                        },
                        {
                            icon: Linkedin,
                            label: 'LinkedIn',
                            href: 'https://linkedin.com/in/alas3s',
                            desc: t('contact.social.linkedin_desc')
                        },
                        {
                            icon: Twitter,
                            label: 'Twitter',
                            href: 'https://twitter.com/adrian',
                            desc: t('contact.social.twitter_desc')
                        },
                    ].map((social, idx) => (
                        <a
                            key={social.label}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group block"
                        >
                            <Card className="h-full bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all hover:-translate-y-1 duration-300">
                                <CardContent className="flex flex-col items-start p-6">
                                    <div className="bg-secondary p-3 rounded-lg mb-4 group-hover:bg-primary/10 group-hover:text-primary transition-colors text-foreground">
                                        <social.icon className="h-6 w-6" />
                                    </div>
                                    <h3 className="font-bold text-lg text-foreground mb-1 group-hover:text-primary transition-colors">
                                        {social.label}
                                    </h3>
                                    <p className="text-sm text-muted-foreground">{social.desc}</p>
                                </CardContent>
                            </Card>
                        </a>
                    ))}
                </motion.div>

                {/* Contact Form */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="bg-card/80 backdrop-blur-md border border-border rounded-3xl p-8 md:p-12 mb-20 shadow-2xl max-w-3xl mx-auto"
                >
                    <div className="mb-10 text-center md:text-left">
                        <h2 className="text-3xl font-bold text-foreground mb-2">{t('contact.title')}</h2>
                        <p className="text-muted-foreground">{t('contact.description', 'Ayúdame a entender qué quieres construir o resolver.')}</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <label htmlFor="name" className="text-sm font-bold text-foreground">{t('contact.name_label')}</label>
                                <Input
                                    id="name"
                                    name="name"
                                    required
                                    placeholder={t('contact.name_placeholder', 'Ej. Ana García')}
                                    className="h-12 border-border bg-secondary/30 focus:bg-background focus:border-primary transition-all"
                                    disabled={isLoading}
                                />
                            </div>
                            <div className="space-y-3">
                                <label htmlFor="email" className="text-sm font-bold text-foreground">{t('contact.email_label')}</label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    placeholder={t('contact.email_placeholder', 'ana@empresa.com')}
                                    className="h-12 border-border bg-secondary/30 focus:bg-background focus:border-primary transition-all"
                                    disabled={isLoading}
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label htmlFor="message" className="text-sm font-bold text-foreground">{t('contact.message_label')}</label>
                            <Textarea
                                id="message"
                                name="message"
                                required
                                placeholder={t('contact.message_placeholder', '¿Qué problema quieres resolver? ¿En qué punto estás ahora y qué te gustaría construir o mejorar?')}
                                className="min-h-[180px] border-border bg-secondary/30 focus:bg-background focus:border-primary transition-all resize-none p-4 leading-relaxed"
                                disabled={isLoading}
                            />
                        </div>

                        <div className="pt-2 flex flex-col md:flex-row items-center gap-6 justify-between">
                            <p className="text-xs text-muted-foreground order-2 md:order-1 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                {t('contact.response_promise', 'Respondo personalmente a todos los mensajes.')}
                            </p>

                            <div className="flex flex-col items-end gap-2 order-1 md:order-2 w-full md:w-auto">
                                <Button
                                    type="submit"
                                    size="lg"
                                    disabled={isLoading}
                                    className="w-full md:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 h-14 text-base shadow-lg shadow-primary/20 hover:scale-105 transition-all"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            {t('contact.sending')}
                                        </>
                                    ) : (
                                        <>
                                            {t('contact.send_btn')} <ArrowRight className="ml-2 h-4 w-4" />
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>
                    </form>
                </motion.div>

            </div>
        </section>
    );
}
