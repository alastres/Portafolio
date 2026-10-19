'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from 'react';
import { toast } from 'sonner';
import type { Locale } from '@/i18n-config';

const EMAIL = 'adrian47388@gmail.com';
const LINKEDIN = 'https://linkedin.com/in/alas3s';
const GITHUB = 'https://github.com/alastres';
const CV = '/Adrian_Roidel_CV.pdf';

interface ContactClientPageProps {
    lang: Locale;
    dict: any;
}

const Up = () => <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" /></svg>;

export default function ContactClientPage({ dict }: ContactClientPageProps) {
    const [isLoading, setIsLoading] = useState(false);
    const t = dict.contact;
    const c = dict.pf.contact;

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.currentTarget;
        setIsLoading(true);
        const fd = new FormData(form);
        const data = { name: fd.get('name'), email: fd.get('email'), message: fd.get('message') };

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (response.ok) {
                toast.success(t.success, { description: t.success_desc });
                form.reset();
            } else {
                toast.error(t.error, { description: t.error_desc });
            }
        } catch {
            toast.error(t.error, { description: t.error_desc });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="pg">
            <section>
                <p className="eyebrow">{t.badge}</p>
                <h1 className="ph1">{t.page_title_part1} <em>{t.page_title_part2}</em></h1>
                <p className="lead">{t.page_desc_part1}<b>{t.page_desc_highlight}</b></p>

                <div className="cgrid">
                    <form className="form" onSubmit={handleSubmit}>
                        <div className="fld">
                            <label htmlFor="name">{t.name_label}</label>
                            <input id="name" name="name" type="text" required autoComplete="name" placeholder={t.name_placeholder} />
                        </div>
                        <div className="fld">
                            <label htmlFor="email">{t.email_label}</label>
                            <input id="email" name="email" type="email" required autoComplete="email" inputMode="email" placeholder={t.email_placeholder} />
                        </div>
                        <div className="fld">
                            <label htmlFor="message">{t.message_label}</label>
                            <textarea id="message" name="message" required rows={6} placeholder={t.message_placeholder} />
                        </div>
                        <button type="submit" className="btn p" disabled={isLoading}>
                            {isLoading ? t.sending : t.send_btn}
                            {!isLoading && <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>}
                        </button>
                        {t.response_promise && <p className="mono" style={{ margin: 0, color: 'var(--mut)', fontSize: 12 }}>{t.response_promise}</p>}
                    </form>

                    <div className="cside">
                        <h2>{t.or_connect}</h2>
                        <div className="rows">
                            <a className="row" href={`mailto:${EMAIL}`}>
                                <span><b>{c.email}</b><small>{EMAIL}</small></span>
                                <span className="ar"><Up /></span>
                            </a>
                            <a className="row" href={LINKEDIN} target="_blank" rel="noopener noreferrer">
                                <span><b>{c.linkedin}</b><small>{c.linkedin_sub}</small></span>
                                <span className="ar"><Up /></span>
                            </a>
                            <a className="row" href={GITHUB} target="_blank" rel="noopener noreferrer">
                                <span><b>{c.github}</b><small>{c.github_sub}</small></span>
                                <span className="ar"><Up /></span>
                            </a>
                            <a className="row" href={CV} download>
                                <span><b>{c.cv}</b><small>{c.cv_sub}</small></span>
                                <span className="ar"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v11m0 0-4-4m4 4 4-4M5 20h14" /></svg></span>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
