'use client';

import { motion } from 'framer-motion';
import { Target, Layers, Zap, MessageSquareText } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card-ui';
import { useTranslation } from 'react-i18next';

const features = [
    {
        icon: <Target className="h-8 w-8 text-primary" />,
        titleKey: "value_prop.product_mindset.title",
        descKey: "value_prop.product_mindset.desc"
    },
    {
        icon: <Layers className="h-8 w-8 text-primary" />,
        titleKey: "value_prop.architecture.title",
        descKey: "value_prop.architecture.desc"
    },
    {
        icon: <Zap className="h-8 w-8 text-primary" />,
        titleKey: "value_prop.speed.title",
        descKey: "value_prop.speed.desc"
    },
    {
        icon: <MessageSquareText className="h-8 w-8 text-primary" />,
        titleKey: "value_prop.communication.title",
        descKey: "value_prop.communication.desc"
    }
];

export default function PropuestaValor() {
    const { t } = useTranslation('translation');

    return (
        <section id="propuesta-valor" className="py-24 bg-background relative overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4"
                    >
                        {t('value_prop.title')}
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
                                        {t(feature.titleKey)}
                                    </h3>
                                    <p className="text-muted-foreground leading-relaxed text-sm">
                                        {t(feature.descKey)}
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
