'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue } from 'framer-motion';
import { ArrowRight, Mail, Send } from 'lucide-react';
import { Button } from '@/components/ui/button-ui';
import { useTranslation, Trans } from 'react-i18next';

export default function CTA() {
    const { t } = useTranslation('translation');
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end end"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
    const y = useTransform(scrollYProgress, [0, 0.5], [100, 0]);

    // Mouse follow effect for the button
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <section ref={containerRef} className="py-32 relative overflow-hidden bg-background">
            {/* Background Gradients */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(59,130,246,0.1),rgba(255,255,255,0))] dark:bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />
            <div className="absolute top-0 left-0 w-full h-full bg-grid-black/[0.05] dark:bg-grid-white/[0.02] -z-10" />

            <div className="container mx-auto px-4 max-w-5xl relative z-10">
                <motion.div
                    style={{ opacity, y }}
                    className="relative rounded-3xl overflow-hidden border border-black/5 dark:border-white/10 bg-gradient-to-b from-black/5 to-black/0 dark:from-white/5 dark:to-white/0 backdrop-blur-sm p-8 sm:p-16 text-center"
                >
                    {/* Animated Glow behind the card */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-blue-500/20 blur-[100px] -z-10 rounded-full pointer-events-none" />

                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 tracking-tight text-foreground">
                        <Trans i18nKey="cta.title">
                            ¿Listo para crear <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 pr-2">
                                algo extraordinario?
                            </span>
                        </Trans>
                    </h2>

                    <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
                        {t('cta.description')}
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Link href="/contact" passHref>
                            <motion.div
                                onMouseMove={handleMouseMove}
                                className="group relative rounded-full p-[1px] overflow-hidden cursor-pointer"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <motion.div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                                    style={{
                                        background: useMotionTemplate`
                                            radial-gradient(
                                                200px circle at ${mouseX}px ${mouseY}px,
                                                rgba(59, 130, 246, 0.5),
                                                transparent 80%
                                            )
                                        `,
                                    }}
                                />
                                <div className="relative bg-background/80 hover:bg-background/90 backdrop-blur-xl rounded-full px-8 py-4 flex items-center gap-3 transition-colors border border-black/5 dark:border-white/10 group-hover:border-blue-500/50">
                                    <span className="font-bold text-lg text-foreground">{t('cta.button')}</span>
                                    <Send className="w-5 h-5 text-blue-500 dark:text-blue-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                                </div>
                            </motion.div>
                        </Link>

                        <Link href="mailto:adrian47388@gmail.com">
                            <Button variant="ghost" className="text-lg px-6 py-6 h-auto rounded-full text-foreground hover:text-primary hover:bg-secondary data-[state=open]:bg-transparent transition-colors">
                                <Mail className="mr-2 h-5 w-5" />
                                adrian47388@gmail.com
                            </Button>
                        </Link>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 p-10 opacity-20 pointer-events-none animate-pulse">
                        <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="100" cy="100" r="99.5" stroke="url(#paint0_linear)" />
                            <defs>
                                <linearGradient id="paint0_linear" x1="100" y1="0" x2="100" y2="200" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="currentColor" className="text-black dark:text-white" stopOpacity="0.5" />
                                    <stop offset="1" stopColor="currentColor" className="text-black dark:text-white" stopOpacity="0" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>

                </motion.div>
            </div>
        </section>
    );
}
