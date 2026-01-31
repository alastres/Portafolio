import { Project } from '@/types';

export const projects: Project[] = [
    {
        slug: 'taskmaster-pro',
        title: 'TaskMaster Pro',
        description: 'Gestor de tareas fullstack con arquitectura profesional y enfoque en equipos reales.',
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

        timeline: '2 Semanas',
        role: 'Full Stack Developer',

        problem: {
            description:
                'Muchos equipos de producto gestionan su trabajo con herramientas que no se adaptan bien a su flujo real, generando fricción operativa, pérdida de visibilidad y problemas de escalabilidad a medida que el equipo crece.',
            painPoints: [
                'Roles y permisos poco flexibles que no reflejan la estructura real del equipo.',
                'Sobrecarga de información que dificulta la adopción por parte de perfiles no técnicos.',
                'Falta de visibilidad clara sobre el estado real del trabajo y cuellos de botella.',
                'Dificultad para escalar proyectos y equipos sin perder control ni trazabilidad.',
                'Dependencia de múltiples herramientas para cubrir necesidades básicas (tareas, comunicación, seguimiento).'
            ]
        },


        solution: {
            description: 'Diseñé y desarrollé una plataforma SaaS fullstack que centraliza la gestión de tareas, equipos y proyectos, priorizando una arquitectura limpia y una experiencia de usuario fluida.',
            features: [
                {
                    title: 'Tablero Kanban',
                    description: 'Visualización intuitiva de tareas con funcionalidad de arrastrar y soltar (Drag & Drop).',
                    icon: 'kanban'
                },
                {
                    title: 'Internacionalización (i18n)',
                    description: 'Soporte completo para español e inglés, con detección automática de idioma.',
                    icon: 'globe'
                },
                {
                    title: 'Gestión de Proyectos',
                    description: 'Organiza tus tareas en diferentes proyectos para un mejor seguimiento.',
                    icon: 'monitor'
                },
                {
                    title: 'Gestión de Equipos',
                    description: 'Colabora con otros usuarios dentro de proyectos específicos.',
                    icon: 'users'
                },
                {
                    title: 'Sistema de Notificaciones',
                    description: 'Mantente al día con las actualizaciones de tus tareas y menciones.',
                    icon: 'bell'
                },
                {
                    title: 'Autenticación Segura',
                    description: 'Inicio de sesión y registro basados en JWT con protección de rutas.',
                    icon: 'shield'
                },
                {
                    title: 'Búsqueda y Filtrado',
                    description: 'Localiza tareas rápidamente por título, estado o prioridad.',
                    icon: 'search'
                },
                {
                    title: 'Clasificado automático de prioridad de tareas',
                    description: 'Se puede activar en la configuración la autogestión de prioridad de tareas (bajo, medio, alto) según el margen de tiempo configurada.',
                    icon: 'priority'
                },
                {
                    title: 'Diseño Premium',
                    description: 'Interfaz moderna, responsiva y con animaciones fluidas (Framer Motion).',
                    icon: 'palette'
                }
            ]
        },

        techStack: [
            { name: 'React 18', category: 'Frontend', icon: 'react' },
            { name: 'Vite', category: 'Frontend', icon: 'vite' },
            { name: 'TypeScript', category: 'Frontend', icon: 'typescript' },
            { name: 'Zustand', category: 'State', icon: 'react' }, // Using React as fallback/proxy for now
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
        title: 'Plataforma de Reservas SaaS', // Renamed to match image example slightly or keep original concept
        description: 'Sistema de reservas online con pagos integrados para profesionales y pequeños negocios de servicios.',
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

        timeline: '3 Semanas',
        role: 'Full Stack Developer',

        problem: {
            description: 'Muchos profesionales de servicios (clases, consultas, sesiones creativas) gestionan sus reservas de forma manual a través de WhatsApp, email o calendarios no sincronizados, lo que genera errores, pérdidas de tiempo y citas desaprovechadas.',
            painPoints: [
                'Reservas desorganizadas entre múltiples canales.',
                'Cancelaciones y no-shows sin control.',
                'Falta de pagos anticipados o señalización.',
                'Herramientas genéricas poco adaptadas a su flujo real.'
            ]
        },

        solution: {
            description: 'Diseñé y desarrollé una plataforma SaaS que centraliza la gestión de reservas, clientes y pagos en un único sistema, permitiendo a los profesionales automatizar su agenda y reducir fricción operativa.',
            features: [
                {
                    title: 'Autenticación y Control de Acceso',
                    description:
                        'Sistema de autenticación flexible y seguro que soporta múltiples métodos de acceso y separa claramente los roles de administradores, proveedores y clientes.',
                    details: [
                        'Login con Google OAuth, Email/Password y Magic Links.',
                        'Verificación OTP en registros por email.',
                        'RBAC con portales diferenciados (Admin, Provider, Client).',
                        'Protecciones activas contra abuso: rate limiting, CAPTCHA y honeypots.'
                    ],
                    icon: 'shield'
                },

                {
                    title: 'Motor de Reservas Avanzado',
                    description:
                        'Motor de reservas configurable que permite a los profesionales definir servicios, disponibilidad y reglas complejas sin fricción para el cliente final.',
                    details: [
                        'Servicios flexibles: duración, precio, capacidad (1-on-1 o grupos).',
                        'Disponibilidad híbrida con reglas semanales y excepciones por fecha.',
                        'Buffers automáticos entre citas para evitar solapamientos.',
                        'Gestión de concurrencia por servicio y límites globales.'
                    ],
                    icon: 'calendar'
                },

                {
                    title: 'Sincronización con Google Calendar',
                    description:
                        'Sincronización bidireccional con Google Calendar para evitar dobles reservas y mantener la agenda siempre actualizada.',
                    details: [
                        'Importación automática de eventos externos.',
                        'Bloqueo de horarios ocupados en tiempo real.',
                        'Actualización automática ante cancelaciones o reprogramaciones.'
                    ],
                    icon: 'calendar-sync'
                },

                {
                    title: 'Pagos y Monetización Integrada',
                    description:
                        'Sistema de pagos completo con Stripe que permite cobros anticipados, payouts automáticos y un modelo SaaS escalable.',
                    details: [
                        'Pagos upfront para confirmar reservas.',
                        'Stripe Connect Express para que cada proveedor cobre directamente.',
                        'Soporte para comisiones de plataforma por transacción.',
                        'Planes de suscripción mensual o anual para proveedores.'
                    ],
                    icon: 'credit-card'
                },

                {
                    title: 'Gestión de Reservas Recurrentes',
                    description:
                        'Soporte nativo para reservas periódicas, ideal para clases, terapias y servicios continuos.',
                    details: [
                        'Configuración semanal o mensual.',
                        'Generación automática de sesiones futuras.',
                        'Gestión centralizada de cancelaciones y cambios.'
                    ],
                    icon: 'repeat'
                },

                {
                    title: 'Internacionalización (i18n)',
                    description:
                        'Plataforma preparada para audiencias internacionales con soporte completo multi-idioma.',
                    details: [
                        'Interfaz totalmente traducida a inglés y español.',
                        'Detección automática de idioma mediante middleware.',
                        'Emails y mensajes de error localizados.'
                    ],
                    icon: 'globe'
                },

                {
                    title: 'Automatización y Notificaciones',
                    description:
                        'Sistema de automatización que reduce tareas manuales y mantiene informados a clientes y proveedores.',
                    details: [
                        'Recordatorios automáticos 24h y 1h antes de la cita.',
                        'Emails transaccionales para confirmaciones y cancelaciones.',
                        'Cron jobs ejecutados de forma serverless.'
                    ],
                    icon: 'bell'
                },

                {
                    title: 'Analíticas y Panel de Control',
                    description:
                        'Dashboard interactivo para que los proveedores entiendan el rendimiento de su negocio.',
                    details: [
                        'Métricas de ingresos y volumen de reservas.',
                        'Servicios más populares.',
                        'Visualizaciones claras mediante gráficos interactivos.'
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
