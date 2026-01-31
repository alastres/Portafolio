'use client';

import { motion } from 'framer-motion';
import { Target, Layers, Zap, MessageSquareText } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card-ui';

const features = [
    {
        icon: <Target className="h-8 w-8 text-primary" />,
        title: "Mentalidad de producto, no solo código",
        description: "No me limito a implementar features. Analizo el problema, el contexto del negocio y propongo soluciones técnicas que tengan sentido hoy y a largo plazo."
    },
    {
        icon: <Layers className="h-8 w-8 text-primary" />,
        title: "Arquitectura clara y código que escala",
        description: "Diseño aplicaciones pensadas para crecer: estructuras limpias, separación de responsabilidades y decisiones técnicas que evitan refactors costosos en el futuro."
    },
    {
        icon: <Zap className="h-8 w-8 text-primary" />,
        title: "Rapidez sin sacrificar calidad",
        description: "Trabajo con herramientas modernas que me permiten avanzar rápido sin comprometer estabilidad, seguridad ni performance."
    },
    {
        icon: <MessageSquareText className="h-8 w-8 text-primary" />,
        title: "Comunicación clara y directa",
        description: "Trato con founders, PMs y diseñadores de forma transparente. Explico decisiones técnicas sin jerga innecesaria y alineo expectativas desde el inicio."
    }
];

export default function PropuestaValor() {
    return (
        <section className="py-24 bg-background relative overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4"
                    >
                        Lo que puedes esperar al trabajar conmigo
                    </motion.h2>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="h-1 w-20 bg-primary mx-auto rounded-full"
                    />
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Card className="h-full border-border/50 bg-background/50 hover:bg-muted/50 transition-colors duration-300 hover:border-primary/20 group">
                                <CardContent className="p-6 flex flex-col items-start h-full">
                                    <div className="mb-6 p-3 rounded-2xl bg-primary/10 border border-primary/20 group-hover:scale-110 transition-transform duration-300">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors">
                                        {feature.title}
                                    </h3>
                                    <p className="text-muted-foreground leading-relaxed text-sm">
                                        {feature.description}
                                    </p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
