'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';

const MAX_TILT = 4; // grados

/** Inclina su contenido hacia el cursor. Solo con ratón y sin movimiento reducido. */
export function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const reduce = useReducedMotion();
    const rx = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
    const ry = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });

    const onMove = (e: React.PointerEvent) => {
        if (reduce || e.pointerType !== 'mouse' || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        ry.set(px * MAX_TILT * 2);
        rx.set(-py * MAX_TILT * 2);
    };
    const reset = () => {
        rx.set(0);
        ry.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onPointerMove={onMove}
            onPointerLeave={reset}
            style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
