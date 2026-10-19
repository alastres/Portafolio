'use client';

import { usePathname } from 'next/navigation';

/** La portada nueva trae su propia navegación; el resto de páginas conservan la cabecera y el pie. */
export function HideOnHome({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    if (/^\/(es|en)\/?$/.test(pathname)) return null;
    return <>{children}</>;
}
