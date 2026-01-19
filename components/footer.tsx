import { useTranslations } from "next-intl"

export function Footer() {
    const t = useTranslations('Footer')

    return (
        <footer className="py-6 md:px-8 md:py-0 border-t">
            <div className="container flex flex-col items-center justify-center gap-4 md:h-24 md:flex-row">
                <div className="inline-flex items-center rounded-full border border-amber-500/50 bg-amber-500/10 px-4 py-1.5 text-sm font-medium text-amber-700 dark:text-amber-400 backdrop-blur-sm transition-colors hover:bg-amber-500/20 hover:text-amber-800 dark:hover:text-amber-300">
                    <p className="text-center leading-loose md:text-center">
                        {t('builtBy')}{" "}
                        <a
                            href="https://github.com/elkingutierrex"
                            target="_blank"
                            rel="noreferrer"
                            className="font-bold hover:underline underline-offset-4"
                        >
                            elkingutierrex | Medellín, Colombia 2026.
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    )
}
