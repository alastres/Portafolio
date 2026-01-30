'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button-ui';
import { Badge } from '@/components/ui/badge-ui';
import Link from 'next/link';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import HeroIDEAnimation from '@/components/ui/hero-ide-animation';

export default function Hero() {
    return (
        <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-32 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex-1 max-w-2xl text-center lg:text-left"
                    >
                        <Badge variant="secondary" className="mb-8 px-4 py-1.5 text-primary bg-primary/10 border-primary/20">
                            <span className="relative flex h-2 w-2 mr-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                            DISPONIBLE PARA NUEVOS PROYECTOS
                        </Badge>

                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-8 leading-[1.1]">
                            Construyo y optimizo <span className="text-primary">productos web</span> que necesitan escalar
                        </h1>

                        <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
                            Ayudo a startups y empresas SaaS a lanzar productos robustos desde el MVP hasta la escala masiva. Especialista en arquitectura limpia y performance.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start mb-12">
                            <Button asChild size="lg" className="w-full sm:w-auto h-12 px-8 text-base bg-primary hover:bg-primary/90 text-primary-foreground border-0 shadow-[0_0_20px_rgba(59,130,246,0.5)] shadow-primary/20">
                                <Link href="/contact">
                                    Hablemos <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto h-12 px-8 text-base border-border text-muted-foreground hover:bg-muted hover:text-foreground">
                                <Link href="/projects">
                                    Ver Proyectos
                                </Link>
                            </Button>
                        </div>

                        <div className="flex flex-wrap gap-6 justify-center lg:justify-start text-sm font-medium text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="h-5 w-5 text-primary" /> +5 Años de Exp.
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="h-5 w-5 text-primary" /> Clean Code
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="h-5 w-5 text-primary" /> Fullstack
                            </div>
                        </div>
                    </motion.div>

                    {/* Image / Visual */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex-1 w-full max-w-xl lg:max-w-none relative"
                    >
                        {/* Abstract Background Blur - Kept for ambiance */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-3xl -z-10" />

                        {/* Laptop Placeholder / IDE Animation */}
                        <div className="relative group rounded-xl shadow-[0_0_120px_-30px_hsl(var(--primary)/0.5)] hover:shadow-[0_0_150px_-20px_hsl(var(--primary)/0.6)] transition-shadow duration-700">
                            <HeroIDEAnimation />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
