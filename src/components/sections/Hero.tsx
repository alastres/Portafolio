'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button-ui';
import { Badge } from '@/components/ui/badge-ui';
import Link from 'next/link';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export default function Hero() {
    return (
        <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-32">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex-1 max-w-2xl text-center lg:text-left"
                    >
                        <Badge variant="secondary" className="mb-8 px-4 py-1.5 text-blue-400 bg-blue-500/10 border-blue-500/20">
                            <span className="relative flex h-2 w-2 mr-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                            </span>
                            DISPONIBLE PARA NUEVOS PROYECTOS
                        </Badge>

                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-8 leading-[1.1]">
                            Construyo y optimizo <span className="text-blue-500">productos web</span> que necesitan escalar
                        </h1>

                        <p className="text-xl text-gray-400 mb-10 leading-relaxed">
                            Ayudo a startups y empresas SaaS a lanzar productos robustos desde el MVP hasta la escala masiva. Especialista en arquitectura limpia y performance.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start mb-12">
                            <Button asChild size="lg" className="w-full sm:w-auto h-12 px-8 text-base bg-blue-500 hover:bg-blue-600 text-white border-0 shadow-[0_0_20px_rgba(59,130,246,0.5)]">
                                <Link href="/contact">
                                    Hablemos <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto h-12 px-8 text-base border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white">
                                <Link href="/projects">
                                    Ver Proyectos
                                </Link>
                            </Button>
                        </div>

                        <div className="flex flex-wrap gap-6 justify-center lg:justify-start text-sm font-medium text-gray-400">
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="h-5 w-5 text-blue-500" /> +5 Años de Exp.
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="h-5 w-5 text-blue-500" /> Clean Code
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="h-5 w-5 text-blue-500" /> Fullstack
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
                        {/* Abstract Background Blur */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-3xl -z-10" />

                        {/* Laptop Placeholder */}
                        <div className="relative rounded-xl bg-gray-900 border border-gray-800 shadow-2xl overflow-hidden aspect-video group">
                            {/* Browser Header */}
                            <div className="h-8 bg-gray-800 flex items-center px-4 gap-2 border-b border-gray-700">
                                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                                <div className="w-3 h-3 rounded-full bg-green-500/50" />
                            </div>
                            {/* Dashboard Content Mockup */}
                            <div className="p-6 h-full bg-[#0a0f1e] relative">
                                <div className="flex gap-4 mb-6">
                                    <div className="w-1/4 h-32 bg-gray-800/50 rounded-lg animate-pulse" />
                                    <div className="w-1/4 h-32 bg-gray-800/50 rounded-lg animate-pulse delay-75" />
                                    <div className="w-1/2 h-32 bg-gray-800/50 rounded-lg animate-pulse delay-150" />
                                </div>
                                <div className="flex gap-4 h-full">
                                    <div className="w-2/3 h-48 bg-gray-800/50 rounded-lg animate-pulse delay-300" />
                                    <div className="w-1/3 h-48 bg-gray-800/50 rounded-lg animate-pulse delay-500" />
                                </div>
                            </div>

                            {/* Glow Effect */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-transparent pointer-events-none" />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
