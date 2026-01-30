"use client"

import * as React from "react"
import { Moon, Sun, Monitor } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button-ui"
import { cn } from "@/lib/utils"

export function ThemeToggle() {
    const { setTheme, theme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    return (
        <div className="fixed bottom-6 right-6 z-50 flex items-center p-1 rounded-full bg-background/80 backdrop-blur-md border border-border shadow-lg">
            <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme("light")}
                className={cn(
                    "h-8 w-8 rounded-full transition-all duration-200 hover:bg-muted",
                    theme === "light" && "bg-primary text-primary-foreground shadow-sm hover:bg-primary hover:text-primary-foreground"
                )}
                title="Light Mode"
            >
                <Sun className="h-4 w-4" />
                <span className="sr-only">Light Mode</span>
            </Button>

            <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme("system")}
                className={cn(
                    "h-8 w-8 rounded-full transition-all duration-200 hover:bg-muted",
                    theme === "system" && "bg-primary text-primary-foreground shadow-sm hover:bg-primary hover:text-primary-foreground"
                )}
                title="System Theme"
            >
                <Monitor className="h-4 w-4" />
                <span className="sr-only">System Theme</span>
            </Button>

            <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme("dark")}
                className={cn(
                    "h-8 w-8 rounded-full transition-all duration-200 hover:bg-muted",
                    theme === "dark" && "bg-primary text-primary-foreground shadow-sm hover:bg-primary hover:text-primary-foreground"
                )}
                title="Dark Mode"
            >
                <Moon className="h-4 w-4" />
                <span className="sr-only">Dark Mode</span>
            </Button>
        </div>
    )
}
