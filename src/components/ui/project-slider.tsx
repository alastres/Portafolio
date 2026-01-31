'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button-ui';

interface ProjectSliderProps {
    images: string[];
}

export default function ProjectSlider({ images }: ProjectSliderProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.95
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.95
        })
    };

    const swipeConfidenceThreshold = 10000;
    const swipePower = (offset: number, velocity: number) => {
        return Math.abs(offset) * velocity;
    };

    const paginate = (newDirection: number) => {
        setDirection(newDirection);
        let newIndex = currentIndex + newDirection;
        if (newIndex < 0) newIndex = images.length - 1;
        if (newIndex >= images.length) newIndex = 0;
        setCurrentIndex(newIndex);
    };

    if (!images || images.length === 0) return null;

    return (
        <div className="space-y-4">
            {/* Main Slider Display */}
            <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-border/50 bg-muted/30 shadow-2xl group">
                <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                        key={currentIndex}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 },
                            scale: { duration: 0.2 }
                        }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={1}
                        onDragEnd={(e, { offset, velocity }) => {
                            const swipe = swipePower(offset.x, velocity.x);
                            if (swipe < -swipeConfidenceThreshold) {
                                paginate(1);
                            } else if (swipe > swipeConfidenceThreshold) {
                                paginate(-1);
                            }
                        }}
                        className="absolute inset-0 flex items-center justify-center bg-black/5"
                    >
                        <Image
                            src={images[currentIndex]}
                            alt={`Slide ${currentIndex + 1}`}
                            fill
                            className="object-contain"
                            priority
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 60vw"
                        />
                    </motion.div>
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <Button
                        variant="secondary"
                        size="icon"
                        className="pointer-events-auto h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 hover:bg-background/90"
                        onClick={() => paginate(-1)}
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </Button>
                    <Button
                        variant="secondary"
                        size="icon"
                        className="pointer-events-auto h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 hover:bg-background/90"
                        onClick={() => paginate(1)}
                    >
                        <ChevronRight className="h-5 w-5" />
                    </Button>
                </div>

                {/* Slide Counter / Indicator */}
                <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-medium border border-white/10">
                    {currentIndex + 1} / {images.length}
                </div>
            </div>

            {/* Thumbnail Navigation */}
            <div className="relative px-2">
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide snap-x">
                    {images.map((img, idx) => (
                        <button
                            key={idx}
                            onClick={() => {
                                setDirection(idx > currentIndex ? 1 : -1);
                                setCurrentIndex(idx);
                            }}
                            className={cn(
                                "relative shrink-0 w-20 h-14 rounded-md overflow-hidden border-2 transition-all cursor-pointer snap-start",
                                currentIndex === idx
                                    ? "border-primary ring-2 ring-primary/20"
                                    : "border-transparent opacity-60 hover:opacity-100"
                            )}
                        >
                            <Image
                                src={img}
                                alt={`Thumb ${idx + 1}`}
                                fill
                                className="object-cover"
                            />
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
