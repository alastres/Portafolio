import { Project } from '@/types';

export const projects: Project[] = [
    {
        slug: 'taskmaster-pro',
        title: 'TaskMaster Pro',
        description: 'Gestor de tareas fullstack con arquitectura profesional y enfoque en equipos reales.',
        version: 'v1.2',
        tags: ['React', 'Next.js', 'Node.js', 'PostgreSQL'],
        image: '/projects/taskmaster-hero.png', // Placeholder
        link: 'https://taskmaster-demo.com',
        github: 'https://github.com/example/taskmaster-pro',

        timeline: '4 Semanas',
        role: 'Full Stack Developer',

        problem: {
            description: 'Los equipos de producto a menudo luchan con herramientas de gestión que son polarizantes: o demasiado simples (listas To-Do) o excesivamente complejas (Jira). Esto crea fricción en el onboarding y pérdida de productividad.',
            painPoints: [
                'Falta de granularidad en permisos de usuario (RBAC).',
                'Curva de aprendizaje empinada para miembros no técnicos.',
                'Dificultad para visualizar métricas de rendimiento en tiempo real.'
            ]
        },

        solution: {
            description: 'Platforma SaaS multi-tenant diseñada para equilibrar potencia y usabilidad. Se priorizó la experiencia de usuario con actualizaciones en tiempo real y una arquitectura modular.',
            features: [
                {
                    title: 'Tablero Kanban Tiempo Real',
                    description: 'Sincronización instantánea de estados usando WebSockets (Socket.io) para colaboración fluida.',
                    icon: 'kanban'
                },
                {
                    title: 'Sistema RBAC',
                    description: 'Control de acceso basado en roles granular para admins, editores y visualizadores.',
                    icon: 'shield'
                },
                {
                    title: 'Analytics Dashboard',
                    description: 'Visualización de velocidad de equipo y burndown charts con Recharts.'
                }
            ]
        },

        techStack: [
            { name: 'Next.js', category: 'Frontend' },
            { name: 'React Query', category: 'State' },
            { name: 'Node.js', category: 'Backend' },
            { name: 'PostgreSQL', category: 'Database' },
            { name: 'Prisma', category: 'ORM' },
            { name: 'Tailwind', category: 'Styling' },
        ],

        challenges: [
            {
                title: 'Gestión de Estado Kanban',
                description: 'Mantener la consistencia del orden de las tareas tras múltiples movimientos de drag-and-drop y sincronizarlos con la DB.',
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
                title: 'Performance de Tablero',
                description: 'Renderizado eficiente de cientos de tareas usando virtualización y memoización selectiva.',
            }
        ]
    },
    {
        slug: 'reserva-saas',
        title: 'InvoiceFlow SaaS', // Renamed to match image example slightly or keep original concept
        description: 'Plataforma de facturación y reservas automatizada para freelancers creativos.',
        version: 'v2.0',
        tags: ['Next.js', 'Stripe', 'Supabase'],
        link: 'https://reserva-saas-demo.com',
        github: 'https://github.com/example/reserva-saas',

        timeline: '8 Semanas',
        role: 'Solo Developer',

        problem: {
            description: 'Los freelancers pierden entre 4-6 horas al mes conciliando pagos manualmente y persiguiendo facturas impagas. El seguimiento manual lleva a pérdida de ingresos.',
            painPoints: [
                'Datos financieros fragmentados en múltiples cuentas bancarias.',
                'Alta carga cognitiva recordando quién ha pagado qué.',
                'Herramientas existentes demasiado complejas (Quickbooks) o simples (Excel).'
            ]
        },

        solution: {
            description: 'Un dashboard unificado que sincroniza feeds bancarios y coteja depósitos con facturas abiertas automáticamente. Sistema "Set and Forget" para recordatorios.',
            features: [
                {
                    title: 'Auto-reconciliación',
                    description: 'Algoritmo difuso que empareja transacciones con facturas con 95% de precisión.',
                    icon: 'refresh'
                },
                {
                    title: 'Recordatorios Inteligentes',
                    description: 'Secuencias de email (Drip) que se detienen automáticamente al detectar pago.',
                    icon: 'bell'
                }
            ]
        },

        techStack: [
            { name: 'Next.js 14', category: 'Framework' },
            { name: 'Tailwind', category: 'Styling' },
            { name: 'Node.js', category: 'Backend API' },
            { name: 'PostgreSQL', category: 'Database' },
            { name: 'AWS', category: 'Hosting' },
            { name: 'Stripe', category: 'Payments' },
        ],

        challenges: [
            {
                title: 'Handling Webhook Idempotency',
                description: 'Asegurar que los webhooks de Stripe se procesen exactamente una vez. Retries de red podían causar registros duplicados si no se manejaban correctamente.',
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
