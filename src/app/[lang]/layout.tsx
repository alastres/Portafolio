import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '@/styles/globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { constructMetadata } from '@/lib/seo';
import { ThemeProvider } from '@/components/theme-provider';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { Toaster } from "@/components/ui/sonner";
import { i18n, type Locale } from '@/i18n-config';
import { getDictionary } from '@/lib/get-dictionary';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export async function generateStaticParams() {
    return i18n.locales.map((locale) => ({ lang: locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
    const { lang } = await params;
    const title = lang === 'es' ? 'Portafolio Adrian Roidel' : 'Portfolio Adrian Roidel';
    const description = lang === 'es'
        ? 'Portafolio Profesional de Desarrollador Fullstack'
        : 'Professional Portfolio for Fullstack Developer';

    return constructMetadata({
        title,
        description,
    });
}

export default async function RootLayout({
    children,
    params,
}: Readonly<{
    children: React.ReactNode;
    params: Promise<{ lang: Locale }>;
}>) {
    const { lang } = await params;
    const dict = await getDictionary(lang);

    return (
        <html lang={lang} className="scroll-smooth" suppressHydrationWarning>
            <head>
                <link rel="alternate" hrefLang="es" href={`${process.env.NEXT_PUBLIC_APP_URL || 'https://portfolio-adrian-lastra.vercel.app'}/es`} />
                <link rel="alternate" hrefLang="en" href={`${process.env.NEXT_PUBLIC_APP_URL || 'https://portfolio-adrian-lastra.vercel.app'}/en`} />
                <link rel="alternate" hrefLang="x-default" href={`${process.env.NEXT_PUBLIC_APP_URL || 'https://portfolio-adrian-lastra.vercel.app'}/es`} />
            </head>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col font-sans bg-background text-foreground`}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                    disableTransitionOnChange={false}
                >
                    <Header lang={lang} dict={dict} />
                    <main className="flex-grow relative">
                        <div className="absolute top-20 left-0 w-full z-30 pointer-events-none">
                            <div className="pointer-events-auto">
                                <Breadcrumbs lang={lang} dict={dict} />
                            </div>
                        </div>
                        {children}
                    </main>
                    <Footer lang={lang} dict={dict} />
                    <ThemeToggle />
                    <Toaster />
                </ThemeProvider>
            </body>
        </html>
    );
}
