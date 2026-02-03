import { Project } from '@/types';

export const projects: Project[] = [
    {
        slug: 'taskmaster-pro',
        title: 'projects.taskmaster-pro.title',
        description: 'projects.taskmaster-pro.description',
        version: 'v1.0',
        tags: ['React', 'Vite', 'Node.js', 'PostgreSQL', 'TypeScript'],
        image: '/images/taskmasterpro/PromoTaskManagerPro.png',
        gallery: [
            '/images/taskmasterpro/PromoTaskManagerPro.png',
            '/images/taskmasterpro/PromoTaskManagerPro2.png',
            '/images/taskmasterpro/chrome-capture-2026-01-31 (1).png',
            '/images/taskmasterpro/chrome-capture-2026-01-31 (2).png',
            '/images/taskmasterpro/chrome-capture-2026-01-31 (3).png',
            '/images/taskmasterpro/chrome-capture-2026-01-31 (4).png',
            '/images/taskmasterpro/chrome-capture-2026-01-31 (5).png',
            '/images/taskmasterpro/chrome-capture-2026-01-31 (6).png',
            '/images/taskmasterpro/chrome-capture-2026-01-31 (7).png',
            '/images/taskmasterpro/chrome-capture-2026-01-31 (8).png',
        ],
        link: 'https://task-master-pro-xi-seven.vercel.app/login',
        github: 'https://github.com/example/taskmaster-pro',

        timeline: 'projects.taskmaster-pro.timeline',
        role: 'projects.taskmaster-pro.role',

        problem: {
            description: 'projects.taskmaster-pro.problem.description',
            painPoints: [
                'projects.taskmaster-pro.problem.painPoints.0',
                'projects.taskmaster-pro.problem.painPoints.1',
                'projects.taskmaster-pro.problem.painPoints.2',
                'projects.taskmaster-pro.problem.painPoints.3',
                'projects.taskmaster-pro.problem.painPoints.4'
            ]
        },


        solution: {
            description: 'projects.taskmaster-pro.solution.description',
            features: [
                {
                    title: 'projects.taskmaster-pro.solution.features.0.title',
                    description: 'projects.taskmaster-pro.solution.features.0.description',
                    icon: 'kanban'
                },
                {
                    title: 'projects.taskmaster-pro.solution.features.1.title',
                    description: 'projects.taskmaster-pro.solution.features.1.description',
                    icon: 'globe'
                },
                {
                    title: 'projects.taskmaster-pro.solution.features.2.title',
                    description: 'projects.taskmaster-pro.solution.features.2.description',
                    icon: 'monitor'
                },
                {
                    title: 'projects.taskmaster-pro.solution.features.3.title',
                    description: 'projects.taskmaster-pro.solution.features.3.description',
                    icon: 'users'
                },
                {
                    title: 'projects.taskmaster-pro.solution.features.4.title',
                    description: 'projects.taskmaster-pro.solution.features.4.description',
                    icon: 'bell'
                },
                {
                    title: 'projects.taskmaster-pro.solution.features.5.title',
                    description: 'projects.taskmaster-pro.solution.features.5.description',
                    icon: 'shield'
                },
                {
                    title: 'projects.taskmaster-pro.solution.features.6.title',
                    description: 'projects.taskmaster-pro.solution.features.6.description',
                    icon: 'search'
                },
                {
                    title: 'projects.taskmaster-pro.solution.features.7.title',
                    description: 'projects.taskmaster-pro.solution.features.7.description',
                    icon: 'priority'
                },
                {
                    title: 'projects.taskmaster-pro.solution.features.8.title',
                    description: 'projects.taskmaster-pro.solution.features.8.description',
                    icon: 'palette'
                }
            ]
        },

        techStack: [
            { name: 'React 18', category: 'Frontend', icon: 'react' },
            { name: 'Vite', category: 'Frontend', icon: 'vite' },
            { name: 'TypeScript', category: 'Frontend', icon: 'typescript' },
            { name: 'Zustand', category: 'State', icon: 'react' },
            { name: 'TanStack Query', category: 'Data', icon: 'reactquery' },
            { name: 'TailwindCSS', category: 'Styling', icon: 'tailwindcss' },
            { name: 'Radix UI', category: 'UI', icon: 'shadcn' },
            { name: 'Framer Motion', category: 'Animations', icon: 'framer' },
            { name: 'i18next', category: 'i18n', icon: 'i18next' },
            { name: 'Node.js', category: 'Backend', icon: 'nodejs' },
            { name: 'Express', category: 'Backend', icon: 'express' },
            { name: 'PostgreSQL', category: 'Database', icon: 'postgresql' },
            { name: 'Prisma', category: 'ORM', icon: 'prisma' },
            { name: 'Zod', category: 'Validation', icon: 'zod' },
        ],

        challenges: [
            {
                title: 'projects.taskmaster-pro.challenges.0.title',
                description: 'projects.taskmaster-pro.challenges.0.description',
                codeSnippet: {
                    language: 'typescript',
                    fileName: 'board-store.ts',
                    code: `interface TaskMove {
  taskId: string;
  sourceCol: string;
  destCol: string;
  newIndex: number;
}

// Optimistic update logic
const moveTaskOptimistic = (move: TaskMove) => {
  set((state) => {
    const sourceCol = state.columns[move.sourceCol];
    const destCol = state.columns[move.destCol];
    // ... logic to splice task from source and insert to dest
    return { columns: { ...state.columns, [move.destCol]: newDest }};
  });
  // Sync with backend in background
  api.updateTaskPosition(move).catch(revertState);
};`
                }
            },
            {
                title: 'projects.taskmaster-pro.challenges.1.title',
                description: 'projects.taskmaster-pro.challenges.1.description',
            }
        ]
    },
    {
        slug: 'reserva-saas',
        title: 'projects.reserva-saas.title',
        description: 'projects.reserva-saas.description',
        version: 'v1.0',
        tags: ['Next.js', 'Stripe', 'PostgreSQL', 'Prisma', 'Tailwind', 'shadcn/ui', 'typescript'],
        image: '/images/scheduler/PromoScheduler.png',
        gallery: [
            '/images/scheduler/PromoScheduler.png',
            '/images/scheduler/PromoScheduler2.png',
            '/images/scheduler/chrome-capture-2026-01-31 (9).png',
            '/images/scheduler/chrome-capture-2026-01-31 (10).png',
            '/images/scheduler/chrome-capture-2026-01-31 (11).png',
            '/images/scheduler/chrome-capture-2026-01-31 (12).png',
            '/images/scheduler/chrome-capture-2026-01-31 (13).png',
            '/images/scheduler/chrome-capture-2026-01-31 (14).png',
            '/images/scheduler/chrome-capture-2026-01-31 (15).png',
            '/images/scheduler/chrome-capture-2026-01-31 (16).png',
            '/images/scheduler/chrome-capture-2026-01-31 (17).png',
            '/images/scheduler/chrome-capture-2026-01-31 (18).png',
            '/images/scheduler/chrome-capture-2026-01-31 (19).png',
            '/images/scheduler/chrome-capture-2026-01-31 (20).png',
            '/images/scheduler/chrome-capture-2026-01-31 (21).png',
            '/images/scheduler/chrome-capture-2026-01-31 (22).png',
            '/images/scheduler/chrome-capture-2026-01-31 (23).png',
            '/images/scheduler/chrome-capture-2026-01-31 (24).png',
            '/images/scheduler/chrome-capture-2026-01-31 (25).png',
        ],
        link: 'https://reservation-system-delta.vercel.app/es',
        github: 'https://github.com/example/reserva-saas',

        timeline: 'projects.reserva-saas.timeline',
        role: 'projects.reserva-saas.role',

        problem: {
            description: 'projects.reserva-saas.problem.description',
            painPoints: [
                'projects.reserva-saas.problem.painPoints.0',
                'projects.reserva-saas.problem.painPoints.1',
                'projects.reserva-saas.problem.painPoints.2',
                'projects.reserva-saas.problem.painPoints.3'
            ]
        },

        solution: {
            description: 'projects.reserva-saas.solution.description',
            features: [
                {
                    title: 'projects.reserva-saas.solution.features.0.title',
                    description: 'projects.reserva-saas.solution.features.0.description',
                    details: [
                        'projects.reserva-saas.solution.features.0.details.0',
                        'projects.reserva-saas.solution.features.0.details.1',
                        'projects.reserva-saas.solution.features.0.details.2',
                        'projects.reserva-saas.solution.features.0.details.3'
                    ],
                    icon: 'shield'
                },
                {
                    title: 'projects.reserva-saas.solution.features.1.title',
                    description: 'projects.reserva-saas.solution.features.1.description',
                    details: [
                        'projects.reserva-saas.solution.features.1.details.0',
                        'projects.reserva-saas.solution.features.1.details.1',
                        'projects.reserva-saas.solution.features.1.details.2',
                        'projects.reserva-saas.solution.features.1.details.3'
                    ],
                    icon: 'calendar'
                },
                {
                    title: 'projects.reserva-saas.solution.features.2.title',
                    description: 'projects.reserva-saas.solution.features.2.description',
                    details: [
                        'projects.reserva-saas.solution.features.2.details.0',
                        'projects.reserva-saas.solution.features.2.details.1',
                        'projects.reserva-saas.solution.features.2.details.2'
                    ],
                    icon: 'calendar-sync'
                },
                {
                    title: 'projects.reserva-saas.solution.features.3.title',
                    description: 'projects.reserva-saas.solution.features.3.description',
                    details: [
                        'projects.reserva-saas.solution.features.3.details.0',
                        'projects.reserva-saas.solution.features.3.details.1',
                        'projects.reserva-saas.solution.features.3.details.2',
                        'projects.reserva-saas.solution.features.3.details.3'
                    ],
                    icon: 'credit-card'
                },
                {
                    title: 'projects.reserva-saas.solution.features.4.title',
                    description: 'projects.reserva-saas.solution.features.4.description',
                    details: [
                        'projects.reserva-saas.solution.features.4.details.0',
                        'projects.reserva-saas.solution.features.4.details.1',
                        'projects.reserva-saas.solution.features.4.details.2'
                    ],
                    icon: 'repeat'
                },
                {
                    title: 'projects.reserva-saas.solution.features.5.title',
                    description: 'projects.reserva-saas.solution.features.5.description',
                    details: [
                        'projects.reserva-saas.solution.features.5.details.0',
                        'projects.reserva-saas.solution.features.5.details.1',
                        'projects.reserva-saas.solution.features.5.details.2'
                    ],
                    icon: 'globe'
                },
                {
                    title: 'projects.reserva-saas.solution.features.6.title',
                    description: 'projects.reserva-saas.solution.features.6.description',
                    details: [
                        'projects.reserva-saas.solution.features.6.details.0',
                        'projects.reserva-saas.solution.features.6.details.1',
                        'projects.reserva-saas.solution.features.6.details.2'
                    ],
                    icon: 'bell'
                },
                {
                    title: 'projects.reserva-saas.solution.features.7.title',
                    description: 'projects.reserva-saas.solution.features.7.description',
                    details: [
                        'projects.reserva-saas.solution.features.7.details.0',
                        'projects.reserva-saas.solution.features.7.details.1',
                        'projects.reserva-saas.solution.features.7.details.2'
                    ],
                    icon: 'chart'
                }
            ]

        },

        techStack: [
            { name: 'Next.js 14', category: 'Framework', icon: 'nextjs' },
            { name: 'TypeScript', category: 'Language', icon: 'typescript' },
            { name: 'PostgreSQL', category: 'Database', icon: 'postgresql' },
            { name: 'Prisma', category: 'ORM', icon: 'prisma' },
            { name: 'Auth.js', category: 'Auth', icon: 'authjs' },
            { name: 'Stripe Connect', category: 'Payments', icon: 'stripe' },
            { name: 'Resend', category: 'Email', icon: 'resend' },
            { name: 'TailwindCSS', category: 'Styling', icon: 'tailwindcss' },
            { name: 'Shadcn/UI', category: 'UI', icon: 'shadcn' },
            { name: 'Zod', category: 'Validation', icon: 'zod' },
            { name: 'React Hook Form', category: 'Forms', icon: 'hookform' },
            { name: 'next-intl', category: 'i18n', icon: 'globe' },
        ],

        challenges: [
            {
                title: 'projects.reserva-saas.challenges.0.title',
                description: 'projects.reserva-saas.challenges.0.description',
                codeSnippet: {
                    language: 'javascript',
                    fileName: 'webhook-handler.ts',
                    code: `const handleWebhook = async (req, res) => {
  const event = req.body;
  
  // 1. Check Redis for Idempotency Key
  const isProcessed = await redis.get(event.id);
  if (isProcessed) {
    return res.status(200).send("Already processed");
  }

  // 2. Process Business Logic
  try {
    if (event.type === 'invoice.paid') {
      await updateInvoiceStatus(event.data.object);
    }
    
    // 3. Mark as processed for 24h
    await redis.set(event.id, 'processed', 'EX', 86400);
    res.json({ received: true });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};`
                }
            }
        ]
    }
];

export function getProjectBySlug(slug: string): Project | undefined {
    return projects.find((project) => project.slug === slug);
}

// Helper to get next/prev projects
export function getAdjacentProjects(currentSlug: string) {
    const index = projects.findIndex(p => p.slug === currentSlug);
    return {
        previous: index > 0 ? projects[index - 1] : null,
        next: index < projects.length - 1 ? projects[index + 1] : null
    };
}
