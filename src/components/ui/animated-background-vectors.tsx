'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function AnimatedBackgroundVectors({ className }: { className?: string }) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring animation for the spotlight movement
    const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
    const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    // Create a mask that moves with the mouse
    const maskImage = useMotionTemplate`radial-gradient(250px circle at ${smoothX}px ${smoothY}px, black, transparent)`;

    return (
        <div className={cn("fixed inset-0 w-full h-full overflow-hidden -z-10 bg-background", className)}>
            {/* 1. Base Grid (Dim) - Static */}
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
                    backgroundSize: '40px 40px',
                    color: 'var(--foreground)'
                }}
            />

            {/* 2. Highlight Grid (Glowing) - Revealed by Mouse Mask */}
            <motion.div
                className="absolute inset-0 opacity-40 pointer-events-none"
                style={{
                    maskImage,
                    WebkitMaskImage: maskImage,
                    backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 2px, transparent 0)`,
                    backgroundSize: '40px 40px',
                    color: 'var(--primary)',
                }}
            >
                {/* Optional: Add some floating geometric shapes that only appear in the spotlight */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-blue-600/5 mix-blend-overlay" />
            </motion.div>

            {/* 3. Interactive Floating Elements (Optional subtle movement) */}
            <div className="absolute inset-0 pointer-events-none opacity-5">
                <PatternPath />
            </div>
        </div>
    );
}

function PatternPath() {
    return (
        <svg className="w-full h-full opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
            <motion.path
                d="M0 100 Q 50 50 100 0"
                vectorEffect="non-scaling-stroke"
                stroke="currentColor"
                strokeWidth="0.5"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2, delay: 1 }}
                className="text-primary"
            />
            <motion.path
                d="M100 100 Q 50 50 0 0"
                vectorEffect="non-scaling-stroke"
                stroke="currentColor"
                strokeWidth="0.5"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2, delay: 1.5 }}
                className="text-blue-500"
            />
        </svg>
    )
}
