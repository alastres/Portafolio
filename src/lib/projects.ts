import { Project } from '@/types';

export const projects: Project[] = [
    {
        slug: 'taskmaster-pro',
        title: 'TaskMaster Pro',
        description: 'Gestor de tareas fullstack con arquitectura profesional y enfoque en equipos reales.',
        tags: ['React', 'Next.js', 'Node.js', 'TypeScript', 'Prisma'],
        problem: 'Los equipos de producto a menudo luchan con herramientas de gestión de tareas que son demasiado simples para flujos de trabajo complejos o demasiado complicadas para una adopción rápida. Se necesitaba una solución intermedia que permitiera gestión de roles, estados personalizados y métricas sin la curva de aprendizaje de herramientas enterprise.',
        solution: 'Desarrollé una plataforma SaaS multi-tenant utilizando Next.js para el frontend y una API RESTful con Node.js/Express. Implementé autenticación segura, roles granulares y un sistema de drag-and-drop optimizado para performance. La arquitectura está desacoplada permitiendo escalar el frontend y backend independientemente.',
        stackDetails: {
            frontend: 'React, Next.js (App Router), Tailwind CSS, Zustand, React Query',
            backend: 'Node.js, Express, TypeScript',
            database: 'PostgreSQL, Prisma ORM',
            infrastructure: 'Docker, Vercel (Frontend), Railway (Backend)',
        },
        challenges: [
            'Gestión de estado complejo en el tablero Kanban con actualizaciones en tiempo real.',
            'Optimización de consultas SQL para dashboards de métricas con gran volumen de datos.',
            'Implementación de sistema de permisos basado en roles (RBAC) escalable.',
        ],
        learnings: [
            'La importancia de la invalidación de caché optimista para una UX fluida.',
            'Patrones de diseño para arquitecturas monolíticas modulares en Node.js.',
            'Manejo eficiente de formularios complejos con validación en ambos lados (Zod).',
        ],
        github: 'https://github.com/example/taskmaster-pro',
        link: 'https://taskmaster-demo.com'
    },
    {
        slug: 'reserva-saas',
        title: 'Sistema de Reservas SaaS',
        description: 'Plataforma de gestión de citas y disponibilidad para profesionales y pequeños negocios.',
        tags: ['Next.js', 'PostgreSQL', 'Stripe', 'Tailwind'],
        problem: 'Pequeños profesionales (nutricionistas, terapeutas, consultores) pierden hasta un 20% de sus ingresos por ineficiencias en la gestión de citas y ausencias ("no-shows"). Las herramientas existentes no ofrecían recordatorios automatizados accesibles ni pagos por adelantado integrados de forma sencilla.',
        solution: 'Construí una plataforma SaaS que permite a los profesionales configurar su disponibilidad y recibir reservas pagadas. Integré Stripe Connect para gestión de pagos divididos y un sistema de notificaciones cron para recordatorios por email/SMS.',
        stackDetails: {
            frontend: 'Next.js 14, React Hook Form, Shadcn UI',
            backend: 'Next.js Server Actions, Supabase (PostgreSQL)',
            database: 'PostgreSQL, Supabase Auth',
            infrastructure: 'Vercel Edge Functions, Cron Jobs',
        },
        challenges: [
            'Manejo de zonas horarias entre el profesional y el cliente final.',
            'Prevención de reservas duplicadas (Race conditions) en alta concurrencia.',
            'Integración segura de webhooks de Stripe para confirmar pagos asíncronos.',
        ],
        learnings: [
            'Uso avanzado de Server Actions para reducir la necesidad de una API separada.',
            'Modelado de bases de datos relacionales para sistemas de calendarización.',
            'Estrategias de manejo de errores en pagos y transacciones distribuidas.',
        ],
        github: 'https://github.com/example/reserva-saas',
        link: 'https://reserva-saas-demo.com'
    }
];

export function getProjectBySlug(slug: string): Project | undefined {
    return projects.find((project) => project.slug === slug);
}
