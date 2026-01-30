'use client';

import { Button } from '@/components/ui/button-ui';
import { Card, CardContent } from '@/components/ui/card-ui';
import { Input } from '@/components/ui/input-ui';
import { Textarea } from '@/components/ui/textarea-ui';
import { Mail, Github, Linkedin, Twitter } from 'lucide-react';
import Link from 'next/link';

export default function ContactPage() {
    return (
        <section className="py-24 sm:py-32 pt-32 sm:pt-40 bg-background min-h-screen">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">

                {/* Header Section */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
                        Construyamos Algo <br className="hidden sm:block" /> Increíble
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
                        Actualmente estoy disponible para proyectos freelance y consultoría.
                        Si tienes una idea de producto o necesitas un socio técnico, hablemos.
                    </p>

                    <Link
                        href="mailto:hola@midominio.com"
                        className="inline-flex items-center text-xl md:text-2xl font-semibold text-primary hover:text-primary/80 transition-colors"
                    >
                        <Mail className="mr-3 h-6 w-6" />
                        hola@midominio.com
                    </Link>
                </div>

                {/* Social Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16 max-w-3xl mx-auto">
                    {[
                        { icon: Github, label: 'GitHub', href: 'https://github.com' },
                        { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com' },
                        { icon: Twitter, label: 'Twitter', href: 'https://twitter.com' },
                    ].map((social) => (
                        <a
                            key={social.label}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group block"
                        >
                            <Card className="bg-card border-border hover:border-primary/50 transition-all hover:-translate-y-1 duration-300">
                                <CardContent className="flex flex-col items-center justify-center p-8">
                                    <div className="bg-secondary p-4 rounded-full mb-4 group-hover:bg-primary/10 group-hover:text-primary transition-colors text-muted-foreground">
                                        <social.icon className="h-6 w-6" />
                                    </div>
                                    <span className="text-muted-foreground font-medium group-hover:text-foreground transition-colors">
                                        {social.label}
                                    </span>
                                </CardContent>
                            </Card>
                        </a>
                    ))}
                </div>

                {/* Contact Form */}
                <div className="bg-card border border-border rounded-2xl p-8 md:p-12 mb-20 shadow-2xl">
                    <h2 className="text-2xl font-bold text-foreground mb-8">Envíame un mensaje</h2>

                    <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-medium text-muted-foreground ml-1">Tu Nombre</label>
                                <Input id="name" placeholder="John Doe" className="border-border bg-background focus:border-primary" />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium text-muted-foreground ml-1">Tu Email</label>
                                <Input id="email" type="email" placeholder="john@example.com" className="border-border bg-background focus:border-primary" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="message" className="text-sm font-medium text-muted-foreground ml-1">¿Cómo puedo ayudarte?</label>
                            <Textarea
                                id="message"
                                placeholder="Cuéntame sobre tu proyecto..."
                                className="min-h-[150px] border-border bg-background focus:border-primary"
                            />
                        </div>

                        <div className="pt-4 flex justify-end">
                            <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-6 text-lg shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] transition-all transform hover:-translate-y-0.5">
                                Enviar Mensaje
                            </Button>
                        </div>
                    </form>
                </div>

            </div>
        </section>
    );
}
