'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Terminal, Check, Loader2, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button-ui';
import { cn } from '@/lib/utils';

interface CVDownloaderProps {
    dict: any;
}

export default function CVDownloader({ dict }: CVDownloaderProps) {
    const [status, setStatus] = useState<'idle' | 'building' | 'complete'>('idle');
    const [logs, setLogs] = useState<string[]>([]);
    const [progress, setProgress] = useState(0);

    const buildSteps = [
        dict.cv.steps.init,
        dict.cv.steps.compile,
        dict.cv.steps.link,
        dict.cv.steps.optimize,
        dict.cv.steps.generate,
        dict.cv.success
    ];

    const handleDownload = () => {
        if (status === 'building') return;

        setStatus('building');
        setLogs([]);
        setProgress(0);

        let currentStep = 0;

        const interval = setInterval(() => {
            if (currentStep < buildSteps.length) {
                setLogs(prev => [...prev, buildSteps[currentStep]]);
                setProgress(prev => Math.min(prev + (100 / buildSteps.length), 100));
                currentStep++;
            } else {
                clearInterval(interval);
                setStatus('complete');
                triggerFileDownload();

                // Reset after a delay
                setTimeout(() => {
                    setStatus('idle');
                    setLogs([]);
                    setProgress(0);
                }, 5000);
            }
        }, 600); // Speed of each step
    };

    const triggerFileDownload = () => {
        const link = document.createElement('a');
        link.href = '/Adrian_Roidel_CV.pdf';
        link.download = 'Adrian_Roidel_CV.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="relative inline-block">
            <AnimatePresence mode="wait">
                {status === 'idle' ? (
                    <motion.div
                        key="idle"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Button
                            onClick={handleDownload}
                            variant="outline"
                            className="group relative h-12 overflow-hidden rounded-full border-border/50 bg-background/50 hover:bg-background/80 hover:border-primary/50 backdrop-blur-sm px-6 transition-all hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <span className="flex items-center gap-2 font-mono text-sm">
                                <Terminal className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                <span className="text-muted-foreground group-hover:text-foreground transition-colors">$</span>
                                <span className="text-foreground group-hover:text-primary transition-colors">{dict.cv.button}</span>
                            </span>
                        </Button>
                    </motion.div>
                ) : (
                    <motion.div
                        key="busy"
                        initial={{ opacity: 0, width: 140 }}
                        animate={{ opacity: 1, width: 'auto' }}
                        exit={{ opacity: 0 }}
                        className="relative overflow-hidden rounded-xl border border-border bg-black/90 text-left p-4 shadow-xl backdrop-blur-md min-w-[300px]"
                    >
                        {/* Status Header */}
                        <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2">
                            <div className="flex items-center gap-2">
                                <Terminal className="h-4 w-4 text-blue-400" />
                                <span className="text-xs text-white/70 font-mono">{dict.cv.terminal_title}</span>
                            </div>
                            <span className="text-xs font-mono text-blue-400">{Math.round(progress)}%</span>
                        </div>

                        {/* Logs */}
                        <div className="font-mono text-xs space-y-1 mb-3 h-[100px] overflow-hidden flex flex-col justify-end">
                            {logs.map((log, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className={cn(
                                        "truncate",
                                        i === logs.length - 1 && status === 'building' ? "text-blue-400" : "text-white/60",
                                        log === dict.cv.success && "text-green-400 font-bold"
                                    )}
                                >
                                    <span className="text-white/30 mr-2">{'>'}</span>
                                    {log}
                                </motion.div>
                            ))}
                        </div>

                        {/* Progress Bar */}
                        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                                className={cn("h-full", status === 'complete' ? "bg-green-500" : "bg-blue-500")}
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ ease: "linear" }}
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
