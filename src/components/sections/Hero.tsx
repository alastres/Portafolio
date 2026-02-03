'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button-ui';
import { Badge } from '@/components/ui/badge-ui';
import Link from 'next/link';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import HeroIDEAnimation from '@/components/ui/hero-ide-animation';
import { useTranslation, Trans } from 'react-i18next';

export default function Hero() {
    const { t } = useTranslation('translation');

    return (
        <section className="relative overflow-hidden pt-28 pb-16 md:pt-40 md:pb-32 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

                {/* 1. Centered Top Section: Badge & Title */}
                <div className="text-center max-w-5xl mx-auto mb-10 md:mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex justify-center"
                    >
                        <Badge variant="secondary" className="mb-6 md:mb-8 px-4 py-1.5 text-primary bg-primary/10 border-primary/20">
                            <span className="relative flex h-2 w-2 mr-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                            {t('hero.badge')}
                        </Badge>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-foreground leading-[1.1]"
                    >
                        <Trans i18nKey="hero.title">
                            Construyo y optimizo <span className="text-primary">productos web</span> listos para escalar
                        </Trans>
                    </motion.h1>
                </div>

                {/* 2. Middle Section: 2 Columns (Text Left, IDE Right) */}
                <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center mb-12 md:mb-20">

                    {/* Left Column: Description & Buttons */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-center lg:text-left order-2 lg:order-1 min-w-0"
                    >
                        <p className="text-lg sm:text-xl text-muted-foreground mb-8 md:mb-10 leading-relaxed">
                            {t('hero.description')}
                        </p>

                        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                            <Button asChild size="lg" className="w-full sm:w-auto h-12 px-8 text-base bg-primary hover:bg-primary/90 text-primary-foreground border-0 shadow-[0_0_20px_rgba(59,130,246,0.5)] shadow-primary/20">
                                <Link href="/contact">
                                    {t('hero.btn_contact')} <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                            <Button asChild size="lg" className="w-full sm:w-auto h-12 px-8 text-base bg-secondary hover:bg-secondary/90 text-secondary-foreground border-0 shadow-[0_0_20px_rgba(59,130,246,0.5)] shadow-secondary/20">
                                <Link href="/projects">
                                    {t('hero.btn_projects')} <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                    </motion.div>

                    {/* Right Column: IDE Animation */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="relative w-full max-w-full min-w-0 order-1 lg:order-2 mb-8 lg:mb-0"
                    >
                        {/* Abstract Background Blur */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-primary/20 rounded-full blur-3xl -z-10" />

                        {/* IDE Container */}
                        <div className="relative group rounded-xl shadow-[0_0_120px_-30px_hsl(var(--primary)/0.5)] hover:shadow-[0_0_150px_-20px_hsl(var(--primary)/0.6)] transition-shadow duration-700">
                            <HeroIDEAnimation />
                        </div>
                    </motion.div>
                </div>

                {/* 3. Bottom Section: Centered Stats/Checks */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex flex-wrap gap-4 md:gap-6 justify-center text-sm font-medium text-muted-foreground"
                >
                    <div className="flex items-center gap-2 bg-background/50 backdrop-blur-sm px-3 py-1 rounded-full border border-border/50">
                        <CheckCircle2 className="h-5 w-5 text-primary" /> {t('hero.stats.saas')}
                    </div>
                    <div className="flex items-center gap-2 bg-background/50 backdrop-blur-sm px-3 py-1 rounded-full border border-border/50">
                        <CheckCircle2 className="h-5 w-5 text-primary" /> {t('hero.stats.architecture')}
                    </div>
                    <div className="flex items-center gap-2 bg-background/50 backdrop-blur-sm px-3 py-1 rounded-full border border-border/50">
                        <CheckCircle2 className="h-5 w-5 text-primary" /> {t('hero.stats.maintainable')}
                    </div>
                    <div className="flex items-center gap-2 bg-background/50 backdrop-blur-sm px-3 py-1 rounded-full border border-border/50">
                        <CheckCircle2 className="h-5 w-5 text-primary" /> {t('hero.stats.mvp')}
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
