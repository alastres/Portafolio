import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '@/styles/globals.css';
import { constructMetadata } from '@/lib/seo';
import { ThemeProvider } from '@/components/theme-provider';
import { MotionProvider } from '@/components/motion-provider';
import { Toaster } from "@/components/ui/sonner";
import { i18n, type Locale } from '@/i18n-config';
import { getDictionary } from '@/lib/get-dictionary';
import { projects } from '@/lib/projects';
import SiteShell from '@/components/shell/SiteShell';
import { display } from '@/components/shell/fonts';

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

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang: langStr } = await params;
    const lang = langStr as Locale;
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
    params: Promise<{ lang: string }>;
}>) {
    const { lang: langStr } = await params;
    const lang = langStr as Locale;
    const dict = await getDictionary(lang);
    const t = (key: string) => key.split('.').reduce<unknown>((o, k) => (o as Record<string, unknown> | undefined)?.[k], dict as unknown);
    const shellProjects = projects.map((p) => ({ slug: p.slug, title: String(t(p.title) ?? p.slug) }));

    return (
        <html lang={lang} className="scroll-smooth" suppressHydrationWarning>
            <body
                className={`${geistSans.variable} ${geistMono.variable} ${display.variable} antialiased min-h-screen flex flex-col font-sans bg-background text-foreground`}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                    disableTransitionOnChange={false}
                >
                    <MotionProvider>
                    <SiteShell lang={lang} c={dict.pf} projects={shellProjects}>
                        {children}
                    </SiteShell>
                    <Toaster />
                    </MotionProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
