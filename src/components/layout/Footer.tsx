export default function Footer() {
    return (
        <footer className="border-t border-border bg-background py-12 mt-auto">
            <div className="container mx-auto flex flex-col items-center justify-between gap-6 px-4 sm:flex-row sm:px-6 lg:px-8 max-w-7xl">
                <p className="text-sm text-muted-foreground font-medium">
                    © {new Date().getFullYear()} Alas3s. All rights reserved.
                </p>
                <div className="flex gap-6">
                    <a
                        href="https://github.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                        GitHub
                    </a>
                    <a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                        LinkedIn
                    </a>
                    <a
                        href="https://twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                        Twitter
                    </a>
                </div>
            </div>
        </footer>
    );
}
