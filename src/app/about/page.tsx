'use client';

import { Button } from '@/components/ui/button-ui';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card-ui';
import { Badge } from '@/components/ui/badge-ui';
import { Lightbulb, Puzzle, Rocket, Code2, Database, Cloud, Terminal, Layers, Layout, ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function AboutPage() {
    return (
        <section className="bg-background min-h-screen pt-32 pb-20 overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">

                {/* Hero Section */}
                <div className="max-w-4xl mb-24">
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-[1.1]">
                        Construyendo Productos, <br />
                        <span className="text-primary">No Solo Funcionalidades.</span>
                    </h1>
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-1 h-12 bg-primary rounded-full"></div>
                        <p className="text-xl md:text-2xl text-muted-foreground font-light">
                            El código es la herramienta. El valor es el producto.
                        </p>
                    </div>
                    <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
                        Conecto la brecha entre el código y el valor de negocio. Mi enfoque prioriza la experiencia de usuario y la lógica de negocio sobre la complejidad técnica innecesaria, asegurando que resolvemos los problemas correctos. No solo escribo funciones; construyo sistemas escalables que impulsan el crecimiento.
                    </p>
                </div>

                {/* Core Pillars */}
                <div className="mb-32">
                    <h2 className="text-3xl font-bold text-foreground mb-2">Pilares Fundamentales</h2>
                    <p className="text-muted-foreground mb-10">Cómo abordo cada proyecto para asegurar escalabilidad y market fit.</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                icon: Lightbulb,
                                title: "Mentalidad de Producto",
                                desc: "Entender el 'Por qué' antes del 'Cómo'. Cada línea de código debe servir a un objetivo de negocio o una necesidad del usuario."
                            },
                            {
                                icon: Puzzle,
                                title: "Resolución de Problemas",
                                desc: "Pensamiento de primeros principios aplicado a la arquitectura. Descomponer sistemas complejos en componentes manejables y escalables."
                            },
                            {
                                icon: Rocket,
                                title: "Ejecución Ágil",
                                desc: "Iterar rápido sin romper cosas. Enfoque en entrega de valor continuo manteniendo la calidad del código para futuras iteraciones."
                            }
                        ].map((item, idx) => (
                            <Card key={idx} className="bg-card border-border hover:border-primary/30 transition-all duration-300">
                                <CardHeader>
                                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                                        <item.icon className="h-6 w-6 text-primary" />
                                    </div>
                                    <CardTitle className="text-foreground text-xl mb-2">{item.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-muted-foreground text-base leading-relaxed">
                                        {item.desc}
                                    </CardDescription>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* The Process */}
                <div className="mb-32 max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-foreground mb-2">El Proceso</h2>
                    <p className="text-muted-foreground mb-16">De la idea abstracta al producto desplegado.</p>

                    <div className="relative">
                        {/* Vertical Line */}
                        <div className="absolute left-[20px] md:left-1/2 top-4 bottom-4 w-0.5 bg-border -translate-x-1/2 hidden md:block"></div>
                        <div className="absolute left-[20px] top-4 bottom-4 w-0.5 bg-border -translate-x-1/2 md:hidden"></div>

                        {[
                            {
                                title: "Descubrimiento y Estrategia",
                                desc: "Definiendo requerimientos y flujos de usuario. No se escribe código hasta saber qué significa el éxito.",
                                align: "left"
                            },
                            {
                                title: "Arquitectura y Diseño",
                                desc: "Diseñando esquemas de bases de datos y estructuras de API escalables que soporten el crecimiento.",
                                align: "right"
                            },
                            {
                                title: "Desarrollo Ágil",
                                desc: "Construyendo funcionalidades en sprints. El feedback constante asegura que siempre avanzamos hacia la meta.",
                                align: "left"
                            },
                            {
                                title: "Despliegue y Escala",
                                desc: "Pipelines automatizados para entregas seguras. Monitoreo proactivo para detectar problemas antes que los usuarios.",
                                align: "right"
                            }
                        ].map((step, idx) => (
                            <div key={idx} className={`relative flex flex-col md:flex-row items-center mb-16 ${step.align === 'left' ? '' : 'md:flex-row-reverse'}`}>
                                {/* Timeline Dot */}
                                <div className="absolute left-[20px] md:left-1/2 -translate-x-1/2 w-4 h-4 bg-background border-[3px] border-primary rounded-full z-10"></div>

                                {/* Content Box */}
                                <div className={`ml-12 md:ml-0 md:w-1/2 ${step.align === 'left' ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'} flex-1`}>
                                    <h3 className="text-xl font-bold text-foreground mb-2">{step.title}</h3>
                                    <div className={`bg-card border border-border p-6 rounded-xl inline-block ${step.align === 'left' ? 'rounded-tr-xl' : 'rounded-tl-xl'}`}>
                                        <p className="text-muted-foreground">{step.desc}</p>
                                    </div>
                                </div>
                                <div className="hidden md:block md:w-1/2"></div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Tech Stack */}
                <div className="mb-32 text-center">
                    <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-10">Tecnologías que Utilizo</h3>
                    <div className="flex flex-wrap justify-center gap-8 md:gap-16">
                        {[
                            { icon: Code2, label: "React" },
                            { icon: Terminal, label: "Node.js" },
                            { icon: Database, label: "PostgreSQL" },
                            { icon: Cloud, label: "AWS" },
                            { icon: Layout, label: "Tailwind" },
                            { icon: Layers, label: "TypeScript" },
                        ].map((tech, idx) => (
                            <div key={idx} className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
                                <tech.icon className="h-6 w-6" />
                                <span className="font-medium text-lg">{tech.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <Card className="bg-card border-border max-w-4xl mx-auto overflow-hidden relative group">
                    <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Rocket className="w-48 h-48 text-primary -rotate-12 transform translate-x-16 -translate-y-8" />
                    </div>
                    <CardContent className="p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
                        <div>
                            <h2 className="text-3xl font-bold text-foreground mb-3">¿Listo para construir tu MVP?</h2>
                            <p className="text-muted-foreground text-lg max-w-md">
                                Convierte tu concepto en un producto real. Actualmente estoy disponible para nuevos proyectos.
                            </p>
                        </div>
                        <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 h-12 text-base shadow-lg shadow-primary/20">
                            <Link href="/contact">
                                Empezar un Proyecto
                            </Link>
                        </Button>
                    </CardContent>
                </Card>

            </div>
        </section>
    );
}
