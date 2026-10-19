/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from 'next/image';
import Link from 'next/link';
import { projects } from '@/lib/projects';
import { getDictionary } from '@/lib/get-dictionary';
import { pageMetadata } from '@/lib/seo';
import type { Locale } from '@/i18n-config';
import Timeline from '@/components/projects/Timeline';

function resolveKey(key: string, dict: any): string {
    let result = dict;
    for (const k of key.split('.')) {
        result = result?.[k];
        if (!result) return key;
    }
    return typeof result === 'string' ? result : key;
}

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang);
    return pageMetadata({ lang, path: '/projects', title: `${dict.projects_page.title} ${dict.projects_page.highlight}`, description: dict.projects_page.description });
}

export default async function ProjectsPage({ params }: { params: Promise<{ lang: Locale }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang);
    const c = dict.pf;
    const pad = (n: number) => String(n).padStart(2, '0');

    return (
        <div className="pg">
            <section>
                <p className="eyebrow">{dict.projects_page.badge}</p>
                <h1 className="ph1">{dict.projects_page.title} <em>{dict.projects_page.highlight}</em></h1>
                <p className="lead">{dict.projects_page.description}</p>

                <Timeline>
                    {projects.map((p, i) => (
                        <li className="tl-item" key={p.slug}>
                            <div className="tl-rail" aria-hidden="true">
                                <span className="tl-num">{pad(i + 1)}</span>
                                <span className="tl-node" />
                            </div>
                            <Link href={`/${lang}/projects/${p.slug}`} className="card" aria-label={`${c.ui.open_case}: ${resolveKey(p.title, dict)}`}>
                                <div className="ph">
                                    <span className="n">{pad(i + 1)}</span>
                                    {p.image && <Image src={p.image} alt="" fill sizes="(max-width:1023px) 100vw, 60vw" priority={i === 0} />}
                                </div>
                                <div className="b">
                                    <h3>{resolveKey(p.title, dict)}</h3>
                                    <span className="for">{c.cases.for[p.slug as keyof typeof c.cases.for]}</span>
                                    <p>{resolveKey(p.description, dict)}</p>
                                    <div className="chips">{p.tags.slice(0, 4).map((tg) => <span key={tg}>{tg}</span>)}</div>
                                    <div className="go">{c.cases.full}
                                        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" /></svg>
                                    </div>
                                </div>
                            </Link>
                        </li>
                    ))}
                </Timeline>
            </section>
        </div>
    );
}
