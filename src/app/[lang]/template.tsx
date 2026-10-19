'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { transition } from '@/lib/motion';

// Se activa tras la primera carga: así la página inicial se pinta visible desde el servidor
// (sin penalizar el LCP) y solo las navegaciones posteriores entran con transición.
let hasNavigated = false;

export default function Template({ children }: { children: React.ReactNode }) {
    const [animateIn] = useState(() => hasNavigated);

    useEffect(() => {
        hasNavigated = true;
    }, []);

    return (
        <motion.div
            initial={animateIn ? { opacity: 0, y: 12 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={transition(0.45)}
        >
            {children}
        </motion.div>
    );
}
