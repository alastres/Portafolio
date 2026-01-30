import Link from 'next/link'
import { Button } from '@/components/ui/button-ui'

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
            <h2 className="text-4xl font-bold text-white mb-4">404 - Not Found</h2>
            <p className="text-gray-400 mb-8 max-w-md">
                Lo sentimos, no pudimos encontrar lo que buscabas.
            </p>
            <Button asChild>
                <Link href="/">
                    Volver al inicio
                </Link>
            </Button>
        </div>
    )
}
