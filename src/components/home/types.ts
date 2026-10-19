import type es from '@/locales/es/translation.json';

export type HomeContent = (typeof es)['pf'];

export interface HomeProject {
    slug: string;
    title: string;
    description: string;
    forWho: string;
    problem: string;
    solution: string;
    role: string;
    timeline: string;
    tags: string[];
    image: string;
    link?: string;
    github?: string;
}
