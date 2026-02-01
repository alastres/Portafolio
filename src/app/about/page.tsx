'use client';

import { Button } from '@/components/ui/button-ui';
import {
    Brain,
    Puzzle,
    Zap
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function AboutPage() {
    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 }
    };

    return (
        <section className="bg-background min-h-screen pt-32 pb-24 overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">

                {/* 1. Hero / Introduction */}
                <motion.div
                    initial="initial"
                    animate="animate"
                    variants={fadeIn}
                    className="mb-24 md:mb-32"
                >
                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-foreground mb-6 leading-[1.1] tracking-tight">
                        Construyendo productos, <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                            no solo funcionalidades.
                        </span>
                    </h1>

                    <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 mb-8 border-l-4 border-primary pl-6">
                        <div>
                            <h2 className="text-xl md:text-2xl font-bold text-foreground">Adrian</h2>
                            <p className="text-muted-foreground font-medium">Ingeniero Informático & Full-Stack Developer</p>
                        </div>
                    </div>

                    <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed max-w-3xl">
                        Conecto la ingeniería con el producto. El código es la herramienta; el valor está en el impacto real que el producto genera en usuarios y negocio.
                    </p>
                </motion.div>

                {/* 2. Bloque "Sobre mí" */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="grid md:grid-cols-12 gap-12 mb-32 items-start"
                >
                    <div className="md:col-span-4">
                        <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-widest sticky top-32">Sobre mí</h2>
                    </div>
                    <div className="md:col-span-8 space-y-6 text-lg text-muted-foreground leading-relaxed">
                        <p>
                            <span className="text-foreground font-semibold">No escribo código por escribir.</span> Diseño y construyo productos web escalables, mantenibles y alineados con objetivos reales de negocio, priorizando experiencia de usuario, simplicidad técnica y crecimiento sostenible.
                        </p>
                        <p>
                            Como Ingeniero Informático, tengo la base académica para entender sistemas complejos. A nivel profesional, mi enfoque es totalmente pragmático: construir soluciones que funcionen en producción, escalen con el tiempo y resuelvan problemas reales.
                        </p>
                        <p>
                            He trabajado en productos tipo SaaS, MVPs y plataformas en producción, enfrentando retos de arquitectura, colaboración, escalabilidad y evolución continua del producto.
                        </p>
                    </div>
                </motion.div>

                {/* 3. Pilares Fundamentales */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-32"
                >
                    <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-10 block md:hidden">Pilares</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Brain,
                                title: "Mentalidad de Producto",
                                desc: "Entender el por qué antes del cómo. Cada decisión técnica se evalúa por su impacto en el producto final y en el usuario."
                            },
                            {
                                icon: Puzzle,
                                title: "Resolución de Problemas",
                                desc: "Pensamiento estructurado y arquitectura pragmática. Descomponer problemas complejos en soluciones claras, mantenibles y escalables."
                            },
                            {
                                icon: Zap,
                                title: "Ejecución Ágil",
                                desc: "Iteración rápida sin sacrificar calidad. Construir, medir y mejorar de forma continua, manteniendo el código limpio y preparado para crecer."
                            }
                        ].map((item, idx) => (
                            <div key={idx} className="bg-secondary/20 p-8 rounded-2xl border border-border/50 hover:border-primary/30 transition-colors">
                                <item.icon className="h-8 w-8 text-primary mb-6" />
                                <h3 className="text-xl font-bold text-foreground mb-3">{item.title}</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* 4. Proceso de Trabajo */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-32"
                >
                    <div className="grid md:grid-cols-12 gap-12">
                        <div className="md:col-span-4">
                            <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-widest sticky top-32">Proceso de Trabajo</h2>
                        </div>
                        <div className="md:col-span-8 space-y-12">
                            {[
                                {
                                    step: "01",
                                    title: "Descubrimiento y Estrategia",
                                    desc: "Definición clara de objetivos, usuarios y métricas de éxito. Nada se construye sin entender primero el problema."
                                },
                                {
                                    step: "02",
                                    title: "Arquitectura y Diseño",
                                    desc: "Diseño de estructuras de datos, APIs y sistemas preparados para escalar y adaptarse al crecimiento futuro."
                                },
                                {
                                    step: "03",
                                    title: "Desarrollo Ágil",
                                    desc: "Construcción iterativa con feedback constante. Código limpio, testado y documentado."
                                },
                                {
                                    step: "04",
                                    title: "Despliegue y Escalado",
                                    desc: "Pipelines CI/CD, monitorización y mejora continua. El trabajo no termina en el commit, termina en producción."
                                }
                            ].map((process, idx) => (
                                <div key={idx} className="group flex gap-6 items-start border-b border-border/40 pb-12 last:border-0 last:pb-0">
                                    <span className="text-4xl font-black text-border group-hover:text-primary/20 transition-colors">
                                        {process.step}
                                    </span>
                                    <div>
                                        <h3 className="text-2xl font-bold text-foreground mb-3">{process.title}</h3>
                                        <p className="text-muted-foreground text-lg leading-relaxed">
                                            {process.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* 5. Tecnologías */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-32 border-y border-border/50 py-16"
                >
                    <div className="text-center mb-10">
                        <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Stack Tecnológico</h2>
                    </div>
                    <div className="flex flex-wrap justify-center gap-x-12 gap-y-8 grayscale hover:grayscale-0 transition-all duration-500">
                        {[
                            "React", "Next.js", "Node.js", "PostgreSQL", "AWS", "Tailwind", "TypeScript"
                        ].map((tech, idx) => (
                            <span key={idx} className="text-xl md:text-2xl font-bold text-foreground/80 hover:text-primary cursor-default transition-colors">
                                {tech}
                            </span>
                        ))}
                    </div>
                </motion.div>

                {/* 6. CTA Final */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="bg-card border border-border rounded-3xl p-8 md:p-16 text-center relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none">
                        <Zap className="w-96 h-96 -rotate-12" />
                    </div>

                    <div className="relative z-10 max-w-2xl mx-auto space-y-8">
                        <h2 className="text-3xl md:text-4xl font-black text-foreground">
                            ¿Listo para construir algo impactante?
                        </h2>
                        <p className="text-xl text-muted-foreground leading-relaxed">
                            Especializado en MVPs, productos SaaS y mejora de sistemas existentes. Hablemos de cómo la ingeniería puede impulsar tu producto.
                        </p>
                        <div className="flex justify-center pt-4">
                            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-10 h-14 rounded-full shadow-xl shadow-primary/20 transition-all hover:scale-105">
                                <Link href="/contact">
                                    Contactar ahora
                                </Link>
                            </Button>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
