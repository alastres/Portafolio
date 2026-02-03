'use client';

import { Button } from '@/components/ui/button-ui';
import { Brain, Puzzle, Zap } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Locale } from '@/i18n-config';
import type { LucideIcon } from 'lucide-react';

interface AboutClientContentProps {
    lang: Locale;
    dict: any;
}

function resolveKey(key: string, dict: any): string {
    const keys = key.split('.');
    let result = dict;
    for (const k of keys) {
        result = result?.[k];
        if (!result) return key;
    }
    return typeof result === 'string' ? result : key;
}

export default function AboutClientContent({ lang, dict }: AboutClientContentProps) {
    // Define pillars with icons inside the client component
    const pillars = [
        {
            icon: Brain,
            titleKey: 'about.pillars.product.title',
            descKey: 'about.pillars.product.desc'
        },
        {
            icon: Puzzle,
            titleKey: 'about.pillars.problem.title',
            descKey: 'about.pillars.problem.desc'
        },
        {
            icon: Zap,
            titleKey: 'about.pillars.agile.title',
            descKey: 'about.pillars.agile.desc'
        },
    ];

    const processes = [
        { step: '01', titleKey: 'about.process.s1.title', descKey: 'about.process.s1.desc' },
        { step: '02', titleKey: 'about.process.s2.title', descKey: 'about.process.s2.desc' },
        { step: '03', titleKey: 'about.process.s3.title', descKey: 'about.process.s3.desc' },
        { step: '04', titleKey: 'about.process.s4.title', descKey: 'about.process.s4.desc' },
    ];

    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 }
    };

    return (
        <section className="bg-background min-h-screen pt-32 pb-24 overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
                {/* Hero */}
                <motion.div initial="initial" animate="animate" variants={fadeIn} className="mb-24 md:mb-32">
                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-foreground mb-6 leading-[1.1] tracking-tight">
                        {dict.about.hero.title_part1} <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
                            {dict.about.hero.title_part2}
                        </span>
                    </h1>

                    <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 mb-8 border-l-4 border-primary pl-6">
                        <div>
                            <h2 className="text-xl md:text-2xl font-bold text-foreground">Adrian</h2>
                            <p className="text-muted-foreground font-medium">{dict.about.hero.role}</p>
                        </div>
                    </div>

                    <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed max-w-3xl">
                        {dict.about.hero.description}
                    </p>          </motion.div>

                {/* About Me */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="grid md:grid-cols-12 gap-12 mb-32 items-start"
                >
                    <div className="md:col-span-4">
                        <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-widest sticky top-32">
                            {dict.about.me.label}
                        </h2>
                    </div>
                    <div className="md:col-span-8 space-y-6 text-lg text-muted-foreground leading-relaxed">
                        <p><span className="font-bold text-foreground">{dict.about.me.p0}</span>{dict.about.me.p1}</p>
                        <p>{dict.about.me.p2}</p>
                        <p>{dict.about.me.p3}</p>
                    </div>
                </motion.div>

                {/* Pillars */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-32">
                    <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-10 block md:hidden">
                        {dict.about.pillars.label}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {pillars.map((item, idx) => (
                            <div key={idx} className="bg-secondary/20 p-8 rounded-2xl border border-border/50 hover:border-primary/30 transition-colors">
                                <item.icon className="h-8 w-8 text-primary mb-6" />
                                <h3 className="text-xl font-bold text-foreground mb-3">{resolveKey(item.titleKey, dict)}</h3>
                                <p className="text-muted-foreground leading-relaxed">{resolveKey(item.descKey, dict)}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Process */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-32">
                    <div className="grid md:grid-cols-12 gap-12">
                        <div className="md:col-span-4">
                            <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-widest sticky top-32">
                                {dict.about.process.label}
                            </h2>
                        </div>
                        <div className="md:col-span-8 space-y-12">
                            {processes.map((process, idx) => (
                                <div key={idx} className="group flex gap-6 items-start border-b border-border/40 pb-12 last:border-0 last:pb-0">
                                    <span className="text-4xl font-black text-border group-hover:text-primary/20 transition-colors">
                                        {process.step}
                                    </span>
                                    <div>
                                        <h3 className="text-2xl font-bold text-foreground mb-3">{resolveKey(process.titleKey, dict)}</h3>
                                        <p className="text-muted-foreground text-lg leading-relaxed">{resolveKey(process.descKey, dict)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Stack */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-32 border-y border-border/50 py-16">
                    <div className="text-center mb-10">
                        <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-widest">{dict.about.stack_label}</h2>
                    </div>
                    <div className="flex flex-wrap justify-center gap-x-12 gap-y-8 grayscale hover:grayscale-0 transition-all duration-500">
                        {["React", "Next.js", "Node.js", "PostgreSQL", "AWS", "Tailwind", "TypeScript"].map((tech, idx) => (
                            <span key={idx} className="text-xl md:text-2xl font-bold text-foreground/80 hover:text-primary cursor-default transition-colors">
                                {tech}
                            </span>
                        ))}
                    </div>
                </motion.div>

                {/* CTA */}
                <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="bg-card border border-border rounded-3xl p-8 md:p-16 text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none">
                        <Zap className="w-96 h-96 -rotate-12" />
                    </div>

                    <div className="relative z-10 max-w-2xl mx-auto space-y-8">
                        <h2 className="text-3xl md:text-4xl font-black text-foreground">{dict.about.cta.title}</h2>
                        <p className="text-xl text-muted-foreground leading-relaxed">{dict.about.cta.description}</p>
                        <div className="flex justify-center pt-4">
                            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-10 h-14 rounded-full shadow-xl shadow-primary/20 transition-all hover:scale-105">
                                <Link href={`/${lang}/contact`}>{dict.about.cta.button}</Link>
                            </Button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
