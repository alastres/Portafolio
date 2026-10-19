'use client';

import { motion, type Variants } from 'framer-motion';
import { EASE_OUT, stagger } from '@/lib/motion';
import { cn } from '@/lib/utils';

const container = stagger(0.07, 0.1);

const word: Variants = {
    hidden: { y: '110%' },
    show: { y: '0%', transition: { duration: 0.7, ease: EASE_OUT } },
};

export interface WordPart {
    text: string;
    className?: string;
}

/** Titular que se revela palabra por palabra, subiendo desde una máscara. */
export function RevealWords({ parts, className }: { parts: WordPart[]; className?: string }) {
    return (
        <motion.h1 variants={container} initial="hidden" animate="show" className={className}>
            {parts.flatMap((part, pi) =>
                part.text
                    .split(' ')
                    .filter(Boolean)
                    .map((w, wi) => (
                        <span key={`${pi}-${wi}`}>
                            <span className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-bottom">
                                <motion.span variants={word} className={cn('inline-block', part.className)}>
                                    {w}
                                </motion.span>
                            </span>{' '}
                        </span>
                    ))
            )}
        </motion.h1>
    );
}
