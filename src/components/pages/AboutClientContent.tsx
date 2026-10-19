/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from 'next/link';
import Image from 'next/image';
import type { Locale } from '@/i18n-config';
import Timeline from '@/components/projects/Timeline';

interface AboutClientContentProps {
    lang: Locale;
    dict: any;
}

export default function AboutClientContent({ lang, dict }: AboutClientContentProps) {
    const a = dict.about;
    const pf = dict.pf;
    const pillars = [a.pillars.product, a.pillars.problem, a.pillars.agile];
    const steps = [a.process.s1, a.process.s2, a.process.s3, a.process.s4];
    const stack = (pf.stack.items.flat() as string[]);
    const pad = (n: number) => String(n).padStart(2, '0');

    return (
        <div className="pg about">
            <section className="ab-hero">
                <div className="ab-copy">
                    <p className="eyebrow">{a.me.label}</p>
                    <h1 className="ph1">{a.hero.title_part1}<em>{a.hero.title_part2}</em></h1>
                    <p className="mono">Adrian Roidel · {a.hero.role}</p>
                    <p className="lead">{a.hero.description}</p>
                    <div className="ab-cta">
                        <Link className="btn p" href={`/${lang}/contact`}>{pf.cta_primary}
                            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                        </Link>
                        <a className="btn" href="/Adrian_Roidel_CV.pdf" download>{pf.contact.cv}</a>
                    </div>
                </div>
                <div className="ab-portrait">
                    <span className="ab-ring" aria-hidden="true" />
                    <div className="avatar"><Image src="/images/profile/adrian.webp" alt={pf.ui.photo_alt} width={600} height={600} priority /></div>
                    <span className="ab-chip c2"><i />{pf.status}</span>
                    <span className="ab-chip c1">{pf.location}</span>
                </div>
            </section>

            <section className="rv">
                <div className="facts2">
                    {(a.facts as { k: string; l: string }[]).map((f) => (
                        <div key={f.l}><b>{f.k}</b><span>{f.l}</span></div>
                    ))}
                </div>
            </section>

            <section className="rv">
                <div className="twocol">
                    <h2 className="lab">{a.me.label}</h2>
                    <div className="txt">
                        <p><b>{a.me.p0}</b>{a.me.p1}</p>
                        <p>{a.me.p2}</p>
                        <p>{a.me.p3}</p>
                    </div>
                </div>
            </section>

            <section className="rv">
                <p className="eyebrow">{a.pillars.label}</p>
                <div className="pillars">
                    {pillars.map((p, i) => (
                        <div className="pillar" key={p.title}>
                            <span className="no">{pad(i + 1)}</span>
                            <h3>{p.title}</h3>
                            <p>{p.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section>
                <p className="eyebrow">{a.process.label}</p>
                <Timeline>
                    {steps.map((s, i) => (
                        <li className="tl-item" key={s.title}>
                            <div className="tl-rail" aria-hidden="true">
                                <span className="tl-num">{pad(i + 1)}</span>
                                <span className="tl-node" />
                            </div>
                            <div className="step"><h3>{s.title}</h3><p>{s.desc}</p></div>
                        </li>
                    ))}
                </Timeline>
            </section>

            <section className="rv">
                <p className="eyebrow">{a.stack_label}</p>
                <div className="marq" aria-label={stack.join(', ')}>
                    <div className="marq-t" aria-hidden="true">
                        {[...stack, ...stack].map((s, i) => <span key={`${s}-${i}`}>{s}</span>)}
                    </div>
                </div>
            </section>

            <div className="cta-card">
                <h2>{a.cta.title}</h2>
                <p>{a.cta.description}</p>
                <Link className="btn p" href={`/${lang}/contact`}>{a.cta.button}</Link>
            </div>
        </div>
    );
}
