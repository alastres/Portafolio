'use client';

import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';

/** Línea fina en el borde superior que indica cuánto se ha leído de la página. */
export function ScrollProgress() {
    const reduce = useReducedMotion();
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

    if (reduce) return null;

    return (
        <motion.div
            aria-hidden="true"
            style={{ scaleX }}
            className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-primary"
        />
    );
}
