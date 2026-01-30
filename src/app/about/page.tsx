export default function AboutPage() {
    return (
        <section className="py-24 sm:py-32 pt-32 sm:pt-40">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                <header className="mb-20">
                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-8">Sobre mí</h1>
                    <p className="text-xl sm:text-2xl text-gray-400 leading-relaxed font-light">
                        Ingeniero de Software apasionado por construir productos que escalan.
                    </p>
                </header>

                <div className="prose prose-lg prose-invert max-w-none text-gray-300 leading-relaxed">
                    <p className="mb-8">
                        Llevo más de 5 años diseñando y construyendo aplicaciones web modernas. Mi enfoque no es solo escribir código, sino
                        <strong className="text-blue-400"> resolver problemas de negocio</strong> a través de la tecnología.
                    </p>
                    <p className="mb-8">
                        Me especializo en el ecosistema de <strong className="text-white">React</strong> y <strong className="text-white">Node.js</strong>, aunque creo firmemente que las herramientas son un medio, no el fin.
                        Disfruto optimizando el rendimiento, refactorizando código legacy para hacerlo mantenible, y diseñando arquitecturas que soporten el crecimiento.
                    </p>
                    <p className="mb-8">
                        He trabajado en startups y equipos ágiles, donde he aprendido que la comunicación y la empatía con el usuario son tan importantes como un código limpio.
                    </p>
                    <p>
                        Cuando no estoy programando, me encontrarás explorando buen café de especialidad, leyendo sobre diseño de producto, o intentando automatizar algo en mi casa.
                    </p>
                </div>
            </div>
        </section>
    );
}
