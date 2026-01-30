import { Button } from '@/components/ui/button-ui';
import { Mail, Github, Linkedin, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function ContactPage() {
    return (
        <section className="py-24 sm:py-32 pt-32 sm:pt-40">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                <header className="mb-20">
                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-8">Contacto</h1>
                    <p className="text-xl sm:text-2xl text-gray-400 leading-relaxed font-light">
                        Vamos a crear algo increíble juntos.
                    </p>
                </header>

                <div className="bg-[#1e293b] rounded-2xl p-8 sm:p-12 border border-gray-800">
                    <p className="text-xl text-gray-300 mb-10 leading-relaxed font-medium">
                        Si estás interesado en colaborar o simplemente quieres saludar, envíame un correo.
                        Siempre estoy abierto a discutir nuevos proyectos, ideas creativas o oportunidades para ser parte de tus visiones.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 mb-16">
                        <Button asChild size="lg" className="text-lg px-8 h-14 bg-blue-500 hover:bg-blue-600">
                            <Link href="mailto:hola@midominio.com">
                                <Mail className="mr-2 h-5 w-5" /> hola@midominio.com
                            </Link>
                        </Button>
                    </div>

                    <div>
                        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-6">O encuéntrame en</h3>
                        <div className="flex flex-wrap gap-8">
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex items-center text-lg font-semibold text-gray-300 hover:text-white transition-colors group">
                                <Linkedin className="mr-2 h-5 w-5 text-gray-500 group-hover:text-blue-400 transition-colors" />
                                LinkedIn
                            </a>
                            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="flex items-center text-lg font-semibold text-gray-300 hover:text-white transition-colors group">
                                <Github className="mr-2 h-5 w-5 text-gray-500 group-hover:text-white transition-colors" />
                                GitHub
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
