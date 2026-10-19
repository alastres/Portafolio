'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { RevealWords } from '@/components/ui/reveal-words';
import { fadeUp, slideInLeft, slideInRight } from '@/lib/motion';
import { Button } from '@/components/ui/button-ui';
import { Badge } from '@/components/ui/badge-ui';
import Link from 'next/link';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import HeroIDEAnimation from '@/components/ui/hero-ide-animation';
import CVDownloader from '@/components/ui/cv-downloader';
import type { Locale } from '@/i18n-config';

interface HeroProps {
    lang: Locale;
    dict: any;
}

export default function Hero({ lang, dict }: HeroProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const reduce = useReducedMotion();
    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
    // Parallax: el editor se desplaza más despacio que la página.
    const ideY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 90]);

    const accent = 'bg-blue-500 bg-clip-text text-transparent';
    const titleParts =
        lang === 'es'
            ? [{ text: 'Construyo y optimizo' }, { text: 'productos web', className: accent }, { text: 'listos para escalar' }]
            : [{ text: 'Building and optimizing' }, { text: 'web products', className: accent }, { text: 'ready to scale' }];

    return (
        <section ref={sectionRef} className="relative overflow-hidden pt-28 pb-16 md:pt-40 md:pb-32 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

                {/* 1. Centered Top Section: Badge & Title */}
                <div className="text-center max-w-5xl mx-auto mb-10 md:mb-16">
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        animate="show"
                        className="flex justify-center"
                    >
                        <Badge variant="secondary" className="mb-6 md:mb-8 px-4 py-1.5 text-primary bg-primary/10 border-primary/20">
                            <span className="relative flex h-2 w-2 mr-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                            {dict.hero.badge}
                        </Badge>
                    </motion.div>

                    <RevealWords
                        parts={titleParts}
                        className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-foreground leading-[1.1]"
                    />
                </div>

                {/* 2. Middle Section: 2 Columns (Text Left, IDE Right) */}
                <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center mb-12 md:mb-20">

                    {/* Left Column: Description & Buttons */}
                    <motion.div
                        variants={slideInLeft}
                        initial="hidden"
                        animate="show"
                        custom={0.2}
                        className="text-center lg:text-left order-2 lg:order-1 min-w-0"
                    >
                        <p className="text-lg sm:text-xl text-muted-foreground mb-8 md:mb-10 leading-relaxed">
                            {dict.hero.description}
                        </p>

                        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                            <Button asChild size="lg" className="w-full sm:w-auto h-12 px-8 text-base bg-primary hover:bg-primary/90 text-primary-foreground border-0 shadow-[0_0_20px_rgba(59,130,246,0.5)] shadow-primary/20 group transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] hover:shadow-[0_0_32px_rgba(59,130,246,0.7)]">
                                <Link href={`/${lang}/contact`}>
                                    {dict.hero.btn_contact} <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                                </Link>
                            </Button>
                            <Button asChild size="lg" className="w-full sm:w-auto h-12 px-8 text-base bg-secondary hover:bg-secondary/90 text-secondary-foreground border-0 shadow-[0_0_20px_rgba(59,130,246,0.5)] shadow-secondary/20 group transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] hover:shadow-[0_0_32px_rgba(59,130,246,0.7)]">
                                <Link href={`/${lang}/projects`}>
                                    {dict.hero.btn_projects} <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                                </Link>
                            </Button>
                        </div>

                        <motion.div
                            variants={fadeUp}
                            initial="hidden"
                            animate="show"
                            custom={0.4}
                            className="mt-8 flex justify-center lg:justify-start"
                        >
                            <CVDownloader dict={dict} />
                        </motion.div>
                    </motion.div>

                    {/* Right Column: IDE Animation */}
                    <motion.div
                        variants={slideInRight}
                        initial="hidden"
                        animate="show"
                        custom={0.3}
                        className="relative w-full max-w-full min-w-0 order-1 lg:order-2 mb-8 lg:mb-0"
                    >
                        {/* Abstract Background Blur */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-primary/20 rounded-full blur-3xl -z-10" />

                        {/* IDE Container */}
                        <motion.div style={{ y: ideY }} className="relative group rounded-xl shadow-[0_0_120px_-30px_hsl(var(--primary)/0.5)] hover:shadow-[0_0_150px_-20px_hsl(var(--primary)/0.6)] transition-shadow duration-700">
                            <HeroIDEAnimation />
                        </motion.div>
                    </motion.div>
                </div>

                {/* 3. Bottom Section: Centered Stats/Checks */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    animate="show"
                    custom={0.4}
                    className="flex flex-wrap gap-4 md:gap-6 justify-center text-sm font-medium text-muted-foreground"
                >
                    <div className="flex items-center gap-2 bg-background/50 backdrop-blur-sm px-3 py-1 rounded-full border border-border/50">
                        <CheckCircle2 className="h-5 w-5 text-primary" /> {dict.hero.stats.saas}
                    </div>
                    <div className="flex items-center gap-2 bg-background/50 backdrop-blur-sm px-3 py-1 rounded-full border border-border/50">
                        <CheckCircle2 className="h-5 w-5 text-primary" /> {dict.hero.stats.architecture}
                    </div>
                    <div className="flex items-center gap-2 bg-background/50 backdrop-blur-sm px-3 py-1 rounded-full border border-border/50">
                        <CheckCircle2 className="h-5 w-5 text-primary" /> {dict.hero.stats.maintainable}
                    </div>
                    <div className="flex items-center gap-2 bg-background/50 backdrop-blur-sm px-3 py-1 rounded-full border border-border/50">
                        <CheckCircle2 className="h-5 w-5 text-primary" /> {dict.hero.stats.mvp}
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
