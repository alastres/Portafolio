/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from 'next/link';
import type { Project } from '@/types';
import type { Locale } from '@/i18n-config';
import Image from 'next/image';
import Gallery from './Gallery';
import SectionNav from './SectionNav';
import Swipe from './Swipe';

interface ProjectDetailProps {
    project: Project;
    previous?: Project | null;
    next?: Project | null;
    lang: Locale;
    dict: any;
}

function resolveKey(key: string, dict: any): string {
    let result = dict;
    for (const k of key.split('.')) {
        result = result?.[k];
        if (!result) return key;
    }
    return typeof result === 'string' ? result : key;
}

const Ico = ({ d }: { d: string }) => (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d={d} /></svg>
);

export default function ProjectDetail({ project, previous, next, lang, dict }: ProjectDetailProps) {
    const t = (key: string) => resolveKey(key, dict);
    const pp = dict.project_page;
    const forWho: string | undefined = dict.pf?.cases?.for?.[project.slug];
    const images = project.gallery?.length ? project.gallery : project.image ? [project.image] : [];

    // Tecnologías agrupadas por categoría
    const groups = new Map<string, string[]>();
    project.techStack?.forEach((s) => {
        const list = groups.get(s.category) ?? [];
        list.push(s.name);
        groups.set(s.category, list);
    });

    return (
        <article className="pg">
            <section>
                <Link className="back" href={`/${lang}/projects`}>
                    <Ico d="M19 12H5M11 6l-6 6 6 6" /> {pp.back}
                </Link>
                {forWho && <p className="eyebrow">{forWho}</p>}
                <h1 className="ph1">{t(project.title)}</h1>
                <p className="lead">{t(project.description)}</p>

                <div className="spec">
                    {project.timeline && <div><small>{pp.timeline}</small><b>{t(project.timeline)}</b></div>}
                    {project.role && <div><small>{pp.role}</small><b>{t(project.role)}</b></div>}
                    <div><small>{pp.stack}</small><b>{project.tags.slice(0, 3).join(' · ')}</b></div>
                </div>

                <div className="dact">
                    {project.link && (
                        <a className="btn p" href={project.link} target="_blank" rel="noopener noreferrer">
                            {pp.view_demo} <Ico d="M7 17 17 7M8 7h9v9" />
                        </a>
                    )}
                    {project.github && (
                        <a className="btn" href={project.github} target="_blank" rel="noopener noreferrer">{pp.repository}</a>
                    )}
                    <Link className="btn" href={`/${lang}/contact`}>{dict.pf.cta_primary}</Link>
                </div>

                {images.length > 0 ? (
                    <Gallery
                        images={images}
                        title={t(project.title)}
                        host={project.link}
                        labels={{ prev: pp.gallery_prev, next: pp.gallery_next, open: pp.gallery_open, close: pp.gallery_close, of: pp.gallery_of }}
                    />
                ) : (
                    <p className="sub" style={{ marginTop: 30 }}>{pp.image_unavailable}</p>
                )}
            </section>

            <SectionNav
                label={pp.on_this_page}
                items={[
                    ...(project.problem ? [{ id: 'problema', label: pp.problem }] : []),
                    ...(project.solution ? [{ id: 'solucion', label: pp.solution }] : []),
                    ...(groups.size ? [{ id: 'stack', label: pp.stack }] : []),
                    ...(project.challenges?.length ? [{ id: 'retos', label: pp.challenges }] : []),
                ]}
            />

            {project.problem && (
                <section className="dsec" id="problema" aria-labelledby="h-problema">
                    <div className="dh"><span className="no" aria-hidden="true">01</span><h2 id="h-problema">{pp.problem}</h2></div>
                    <div className="dbody">
                        <p className="dlead">{t(project.problem.description)}</p>
                        {project.problem.painPoints?.length > 0 && (
                            <Swipe as="ul" className="pain" label={pp.swipe}>{project.problem.painPoints.map((pt) => <li key={pt}>{t(pt)}</li>)}</Swipe>
                        )}
                    </div>
                </section>
            )}

            {project.solution && (
                <section className="dsec" id="solucion" aria-labelledby="h-solucion">
                    <div className="dh"><span className="no" aria-hidden="true">02</span><h2 id="h-solucion">{pp.solution}</h2></div>
                    <div className="dbody">
                        <p className="dlead">{t(project.solution.description)}</p>
                        <Swipe as="ol" className="feats" label={pp.swipe}>
                            {project.solution.features?.map((f, i) => (
                                <li className="feat" key={f.title}>
                                    <span className="fn">{String(i + 1).padStart(2, '0')}</span>
                                    <h3>{t(f.title)}</h3>
                                    <p>{t(f.description)}</p>
                                    {f.details && f.details.length > 0 && (
                                        <ul>{f.details.map((d) => <li key={d}>{t(d)}</li>)}</ul>
                                    )}
                                </li>
                            ))}
                        </Swipe>
                    </div>
                </section>
            )}

            {groups.size > 0 && (
                <section className="dsec" id="stack" aria-labelledby="h-stack">
                    <div className="dh"><span className="no" aria-hidden="true">03</span><h2 id="h-stack">{pp.stack}</h2></div>
                    <div className="dbody">
                        <p className="dlead">{pp.stack_lead.replace('{n}', String(project.techStack?.length ?? 0))}</p>
                        <div className="tchips hl">
                            {project.tags.slice(0, 6).map((n) => <span key={n}>{n}</span>)}
                        </div>
                        <details className="smore">
                            <summary>{pp.stack_more}<i aria-hidden="true" /></summary>
                            <div className="sgrid">
                                {[...groups.entries()].map(([cat, names]) => (
                                    <div className="srow" key={cat}>
                                        <h3>{cat}</h3>
                                        <div className="tchips">{names.map((n) => <span key={n}>{n}</span>)}</div>
                                    </div>
                                ))}
                            </div>
                        </details>
                    </div>
                </section>
            )}

            {project.challenges && project.challenges.length > 0 && (
                <section className="dsec" id="retos" aria-labelledby="h-retos">
                    <div className="dh"><span className="no" aria-hidden="true">04</span><h2 id="h-retos">{pp.challenges}</h2></div>
                    <div className="dbody">
                        <Swipe className="chals" label={pp.swipe}>
                        {project.challenges.map((ch) => (
                            <article className="chal" key={ch.title}>
                                <h3>{t(ch.title)}</h3>
                                <p>{t(ch.description)}</p>
                                {ch.codeSnippet && (
                                    <div className="code" role="region" aria-label={`${pp.code_label ?? 'Code'}: ${ch.codeSnippet.fileName ?? ch.codeSnippet.language}`} tabIndex={0}>
                                        <header><i /><i /><i /><span>{ch.codeSnippet.fileName ?? ch.codeSnippet.language}</span><em>{ch.codeSnippet.language}</em></header>
                                        <pre><code>{ch.codeSnippet.code}</code></pre>
                                    </div>
                                )}
                            </article>
                        ))}
                        </Swipe>
                    </div>
                </section>
            )}

            <nav className="pnav" aria-label="Proyectos">
                {previous ? (
                    <Link href={`/${lang}/projects/${previous.slug}`} rel="prev">
                        {previous.image && <Image src={previous.image} alt="" fill sizes="(max-width:760px) 100vw, 40vw" />}
                        <small>{pp.prev_project}</small>{t(previous.title)}
                    </Link>
                ) : <span />}
                {next ? (
                    <Link href={`/${lang}/projects/${next.slug}`} rel="next">
                        {next.image && <Image src={next.image} alt="" fill sizes="(max-width:760px) 100vw, 40vw" />}
                        <small>{pp.next_project}</small>{t(next.title)}
                    </Link>
                ) : <span />}
            </nav>

            <div className="cta-card">
                <h2>{pp.cta_title}</h2>
                <p>{pp.cta_text}</p>
                <Link className="btn p" href={`/${lang}/contact`}>{dict.pf.cta_primary}</Link>
            </div>
        </article>
    );
}
