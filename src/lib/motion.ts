import type { Transition, Variants } from 'framer-motion';

/** Curva de entrada suave: arranque rápido, final largo. */
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

export const DURATION = {
    fast: 0.25,
    base: 0.5,
    slow: 0.8,
} as const;

export const transition = (duration: number = DURATION.base, delay = 0): Transition => ({
    duration,
    delay,
    ease: EASE_OUT,
});

/** Aparece desde abajo. Úsalo con initial="hidden" y animate/whileInView="show"; custom={segundos} añade retardo. */
export const fadeUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: (delay: number = 0) => ({ opacity: 1, y: 0, transition: transition(DURATION.base, delay) }),
};

export const fadeIn: Variants = {
    hidden: { opacity: 0 },
    show: (delay: number = 0) => ({ opacity: 1, transition: transition(DURATION.base, delay) }),
};

export const scaleIn: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    show: (delay: number = 0) => ({ opacity: 1, scale: 1, transition: transition(DURATION.base, delay) }),
};

export const slideInLeft: Variants = {
    hidden: { opacity: 0, x: -24 },
    show: (delay: number = 0) => ({ opacity: 1, x: 0, transition: transition(DURATION.slow, delay) }),
};

export const slideInRight: Variants = {
    hidden: { opacity: 0, x: 24 },
    show: (delay: number = 0) => ({ opacity: 1, x: 0, transition: transition(DURATION.slow, delay) }),
};

/** Contenedor que escalona a sus hijos. */
export const stagger = (staggerChildren = 0.08, delayChildren = 0): Variants => ({
    hidden: {},
    show: { transition: { staggerChildren, delayChildren } },
});

/** Opciones estándar para whileInView: se anima una sola vez, un poco antes de entrar. */
export const viewportOnce = { once: true, margin: '-80px' } as const;
