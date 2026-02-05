# Portafolio Profesional - Adrian Roidel (Alias: Alas3s)

Un portafolio web moderno y de alto rendimiento construido con **Next.js 15**, **React 19** y **Tailwind CSS**. Diseñado para mostrar proyectos, habilidades y experiencia profesional con un enfoque en la experiencia de usuario (UX), accesibilidad y una arquitectura escalable.

## 🚀 Tecnologías Clave

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Biblioteca**: [React 19](https://react.dev/)
- **Lenguaje**: [TypeScript](https://www.typescriptlang.org/)
- **Estilos**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animaciones**: [Framer Motion](https://www.framer.com/motion/)
- **Internacionalización**: Implementación personalizada de i18n basada en rutas (`/[lang]`) con Server Components.
- **Iconos**: [Lucide React](https://lucide.dev/)
- **Correo**: Integración con Nodemailer.

## ✨ Características Destacadas

- **Soporte Bilingüe Completo**: Navegación fluida entre Español (`/es`) e Inglés (`/en`) con detección automática basada en preferencias del usuario.
- **Descarga de CV Interactiva**: Una experiencia única tipo "Terminal" que simula la compilación de habilidades antes de descargar el CV.
- **Modo Oscuro Premium**: Tema visual adaptable (Claro/Oscuro) con una paleta de colores "Slate" profesional y persistencia de preferencias.
- **Showcase de Proyectos**: Páginas de detalle dinámicas para cada proyecto, generadas estáticamente para máximo rendimiento.
- **SEO Optimizado**:
    - Generación dinámica de `sitemap.xml` y `robots.txt`.
    - Metadatos bilingües y etiquetas Open Graph dinámicas.
    - Favicon generado dinámicamente (`ImageResponse`) que se adapta al tema.
- **Accesibilidad**: Componentes construidos siguiendo estándares WCAG.

## 🛠️ Instalación y Uso

1.  **Clonar el repositorio**:
    ```bash
    git clone https://github.com/tu-usuario/portafolio.git
    cd portafolio
    ```

2.  **Instalar dependencias**:
    ```bash
    npm install
    ```

3.  **Configurar variables de entorno**:
    Crea un archivo `.env` en la raíz basado en `.env.example` (si aplica) o configura las credenciales de correo:
    ```env
    EMAIL_SERVER_USER=tu@email.com
    EMAIL_SERVER_PASSWORD=tu_password_app
    EMAIL_FROM=tu@email.com
    NEXT_PUBLIC_APP_URL=http://localhost:3000
    ```

4.  **Iniciar servidor de desarrollo**:
    ```bash
    npm run dev
    ```
    Visita [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📦 Despliegue

El proyecto está optimizado para **Vercel**.

1.  Construir para producción:
    ```bash
    npm run build
    ```
    *Nota: Asegúrate de que no haya servidores de desarrollo corriendo para evitar conflictos de archivos durante el build.*

2.  Iniciar servidor de producción:
    ```bash
    npm start
    ```

## 📂 Estructura del Proyecto

- `src/app/[lang]`: Rutas dinámicas para la internacionalización.
- `src/components`: Componentes reutilizables (UI, Layout, Secciones).
- `src/locales`: Archivos de traducción JSON (`es`, `en`).
- `src/lib`: Utilidades, helpers de SEO y lógica de negocio.
- `public`: Activos estáticos (imágenes, PDF del CV).

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la [Licencia MIT](LICENSE).
