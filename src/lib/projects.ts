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
        github: 'https://github.com/alastres/TaskMasterPro',

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
        github: 'https://github.com/alastres/reservation-system',

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
    },
    {
        slug: 'fivem-store',
        title: 'projects.fivem-store.title',
        description: 'projects.fivem-store.description',
        version: 'v1.0',
        tags: ['Next.js', 'React', 'PostgreSQL', 'Prisma', 'Stripe', 'Socket.io', 'TypeScript', 'Tailwind'],
        image: '/images/fivemstore/fivemstore cover.png',
        gallery: [
            '/images/fivemstore/fivemstore cover.png',
            '/images/fivemstore/FireShot Capture 002 - FiveM Store - Premium Scripts & Assets - [fivem-store-theta.vercel.app].png',
            '/images/fivemstore/FireShot Capture 003 - FiveM Store - Premium Scripts & Assets - [fivem-store-theta.vercel.app].png',
            '/images/fivemstore/FireShot Capture 005 - FiveM Store - Premium Scripts & Assets - [fivem-store-theta.vercel.app].png',
            '/images/fivemstore/FireShot Capture 006 - Sandbox - [checkout.stripe.com].png',
            '/images/fivemstore/FireShot Capture 007 - FiveM Store - Premium Scripts & Assets - [fivem-store-theta.vercel.app].png',
            '/images/fivemstore/FireShot Capture 008 - FiveM Store - Premium Scripts & Assets - [fivem-store-theta.vercel.app].png',
            '/images/fivemstore/FireShot Capture 009 - FiveM Store - Premium Scripts & Assets - [fivem-store-theta.vercel.app].png',
            '/images/fivemstore/FireShot Capture 010 - FiveM Store - Premium Scripts & Assets - [fivem-store-theta.vercel.app].png',
            '/images/fivemstore/FireShot Capture 011 - FiveM Store - Premium Scripts & Assets - [fivem-store-theta.vercel.app].png',
            '/images/fivemstore/FireShot Capture 013 - FiveM Store - Premium Scripts & Assets - [fivem-store-theta.vercel.app].png',
            '/images/fivemstore/FireShot Capture 014 - FiveM Store - Premium Scripts & Assets - [fivem-store-theta.vercel.app].png',
            '/images/fivemstore/FireShot Capture 015 - FiveM Store - Premium Scripts & Assets - [fivem-store-theta.vercel.app].png',
            '/images/fivemstore/FireShot Capture 016 - FiveM Store - Premium Scripts & Assets - [fivem-store-theta.vercel.app].png',
            '/images/fivemstore/FireShot Capture 017 - FiveM Store - Premium Scripts & Assets - [fivem-store-theta.vercel.app].png',
            '/images/fivemstore/FireShot Capture 018 - FiveM Store - Premium Scripts & Assets - [fivem-store-theta.vercel.app].png',
            '/images/fivemstore/FireShot Capture 019 - FiveM Store - Premium Scripts & Assets - [fivem-store-theta.vercel.app].png',
            '/images/fivemstore/FireShot Capture 020 - FiveM Store - Premium Scripts & Assets - [fivem-store-theta.vercel.app].png',
            '/images/fivemstore/FireShot Capture 021 - FiveM Store - Premium Scripts & Assets - [fivem-store-theta.vercel.app].png',
        ],
        link: 'https://fivem-store-theta.vercel.app/es',
        github: 'https://github.com/alastres/fivem-store',

        timeline: 'projects.fivem-store.timeline',
        role: 'projects.fivem-store.role',

        problem: {
            description: 'projects.fivem-store.problem.description',
            painPoints: [
                'projects.fivem-store.problem.painPoints.0',
                'projects.fivem-store.problem.painPoints.1',
                'projects.fivem-store.problem.painPoints.2',
                'projects.fivem-store.problem.painPoints.3',
            ]
        },

        solution: {
            description: 'projects.fivem-store.solution.description',
            features: [
                {
                    title: 'projects.fivem-store.solution.features.0.title',
                    description: 'projects.fivem-store.solution.features.0.description',
                    icon: 'credit-card'
                },
                {
                    title: 'projects.fivem-store.solution.features.1.title',
                    description: 'projects.fivem-store.solution.features.1.description',
                    icon: 'shield'
                },
                {
                    title: 'projects.fivem-store.solution.features.2.title',
                    description: 'projects.fivem-store.solution.features.2.description',
                    icon: 'monitor'
                },
                {
                    title: 'projects.fivem-store.solution.features.3.title',
                    description: 'projects.fivem-store.solution.features.3.description',
                    icon: 'bell'
                },
                {
                    title: 'projects.fivem-store.solution.features.4.title',
                    description: 'projects.fivem-store.solution.features.4.description',
                    icon: 'globe'
                },
                {
                    title: 'projects.fivem-store.solution.features.5.title',
                    description: 'projects.fivem-store.solution.features.5.description',
                    icon: 'palette'
                }
            ]
        },

        techStack: [
            { name: 'Next.js 16', category: 'Framework', icon: 'nextjs' },
            { name: 'React 19', category: 'Frontend', icon: 'react' },
            { name: 'TypeScript', category: 'Language', icon: 'typescript' },
            { name: 'PostgreSQL', category: 'Database', icon: 'postgresql' },
            { name: 'Prisma', category: 'ORM', icon: 'prisma' },
            { name: 'Stripe', category: 'Payments', icon: 'stripe' },
            { name: 'Socket.io', category: 'Realtime', icon: 'socketio' },
            { name: 'TailwindCSS', category: 'Styling', icon: 'tailwindcss' },
            { name: 'next-intl', category: 'i18n', icon: 'globe' },
            { name: 'Nodemailer', category: 'Email', icon: 'nodemailer' },
        ],

        challenges: [
            {
                title: 'projects.fivem-store.challenges.0.title',
                description: 'projects.fivem-store.challenges.0.description',
                codeSnippet: {
                    language: 'typescript',
                    fileName: 'download-token.ts',
                    code: `// Generate a one-time signed download token
export async function generateDownloadToken(orderId: string, productId: string) {
  const token = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 min

  await db.downloadToken.create({
    data: { token, orderId, productId, expiresAt, used: false },
  });

  return token;
}

// Validate and consume the token (one-time use)
export async function consumeDownloadToken(token: string) {
  const record = await db.downloadToken.findUnique({ where: { token } });

  if (!record || record.used || record.expiresAt < new Date()) {
    throw new Error('Invalid or expired download token');
  }

  await db.downloadToken.update({ where: { token }, data: { used: true } });
  return record;
}`
                }
            },
            {
                title: 'projects.fivem-store.challenges.1.title',
                description: 'projects.fivem-store.challenges.1.description',
            }
        ]
    },
    {
        slug: 'rutafacil',
        title: 'projects.rutafacil.title',
        description: 'projects.rutafacil.description',
        version: 'v1.0',
        tags: ['React 18', 'Vite', 'TypeScript', 'PWA', 'Zustand', 'MapLibre GL'],
        image: '/images/rutafacil/rutafacil-cover.png',
        gallery: [
            '/images/rutafacil/rutafacil-cover.png',
            '/images/rutafacil/rutafacil-map.png',
            '/images/rutafacil/rutafacil-mobile-stops.png',
            '/images/rutafacil/rutafacil-mobile-map.png',
            '/images/rutafacil/rutafacil-dispatch.png',
            '/images/rutafacil/rutafacil-history.png',
        ],
        link: 'https://rutafacil-ten.vercel.app',
        github: 'https://github.com/alastres/rutafacil',

        timeline: 'projects.rutafacil.timeline',
        role: 'projects.rutafacil.role',

        problem: {
            description: 'projects.rutafacil.problem.description',
            painPoints: [
                'projects.rutafacil.problem.painPoints.0',
                'projects.rutafacil.problem.painPoints.1',
                'projects.rutafacil.problem.painPoints.2',
                'projects.rutafacil.problem.painPoints.3',
            ]
        },

        solution: {
            description: 'projects.rutafacil.solution.description',
            features: [
                {
                    title: 'projects.rutafacil.solution.features.0.title',
                    description: 'projects.rutafacil.solution.features.0.description',
                    icon: 'route'
                },
                {
                    title: 'projects.rutafacil.solution.features.1.title',
                    description: 'projects.rutafacil.solution.features.1.description',
                    icon: 'share'
                },
                {
                    title: 'projects.rutafacil.solution.features.2.title',
                    description: 'projects.rutafacil.solution.features.2.description',
                    icon: 'smartphone'
                },
                {
                    title: 'projects.rutafacil.solution.features.3.title',
                    description: 'projects.rutafacil.solution.features.3.description',
                    icon: 'map-pin'
                },
                {
                    title: 'projects.rutafacil.solution.features.4.title',
                    description: 'projects.rutafacil.solution.features.4.description',
                    icon: 'navigation'
                },
                {
                    title: 'projects.rutafacil.solution.features.5.title',
                    description: 'projects.rutafacil.solution.features.5.description',
                    icon: 'chart'
                }
            ]
        },

        techStack: [
            { name: 'React 18', category: 'Frontend', icon: 'react' },
            { name: 'Vite 6', category: 'Build Tool', icon: 'vite' },
            { name: 'TypeScript', category: 'Language', icon: 'typescript' },
            { name: 'PWA', category: 'Mobile & Offline', icon: 'pwa' },
            { name: 'MapLibre GL', category: 'Mapping / GIS', icon: 'globe' },
            { name: 'Zustand', category: 'State Management', icon: 'react' },
            { name: 'Framer Motion', category: 'Animations', icon: 'framer' },
            { name: 'Vitest', category: 'Testing', icon: 'vitest' },
        ],

        challenges: [
            {
                title: 'projects.rutafacil.challenges.0.title',
                description: 'projects.rutafacil.challenges.0.description',
                codeSnippet: {
                    language: 'typescript',
                    fileName: 'tsp.ts',
                    code: `// Heurística de Vecino Más Cercano + Mejora 2-Opt (Cálculo On-Device $0)
export function optimizeOrder(
  origin: LatLng,
  stops: LatLng[],
  fixedEnd?: LatLng,
): number[] {
  const n = stops.length;
  if (n <= 1) return stops.map((_, i) => i);

  const points = fixedEnd ? [origin, ...stops, fixedEnd] : [origin, ...stops];
  const dist: number[][] = points.map((a) =>
    points.map((b) => haversineKm(a, b)),
  );
  const endIdx = fixedEnd ? n + 1 : null;

  // 1. Vecino más cercano desde el origen
  const visited = new Array<boolean>(n + 1).fill(false);
  visited[0] = true;
  const path: number[] = [0];
  let current = 0;
  for (let step = 0; step < n; step++) {
    let best = -1;
    let bestDist = Infinity;
    for (let j = 1; j <= n; j++) {
      if (!visited[j] && dist[current][j] < bestDist) {
        bestDist = dist[current][j];
        best = j;
      }
    }
    visited[best] = true;
    path.push(best);
    current = best;
  }
  if (endIdx !== null) path.push(endIdx);

  // 2. Optimización 2-opt: invierte segmentos mientras acorte el camino
  let improved = true;
  while (improved) {
    improved = false;
    for (let i = 1; i < n; i++) {
      for (let k = i + 1; k <= n; k++) {
        const a = path[i - 1];
        const b = path[i];
        const c = path[k];
        const d = k + 1 <= n ? path[k + 1] : endIdx;
        const before = dist[a][b] + (d !== null ? dist[c][d] : 0);
        const after = dist[a][c] + (d !== null ? dist[b][d] : 0);
        if (after < before - 1e-9) {
          let lo = i;
          let hi = k;
          while (lo < hi) {
            [path[lo], path[hi]] = [path[hi], path[lo]];
            lo++;
            hi--;
          }
          improved = true;
        }
      }
    }
  }

  return path.slice(1, n + 1).map((p) => p - 1);
}`
                }
            },
            {
                title: 'projects.rutafacil.challenges.1.title',
                description: 'projects.rutafacil.challenges.1.description',
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
