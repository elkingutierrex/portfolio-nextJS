"use client"

import * as React from "react"
import { Globe } from "lucide-react"
import { useLocale } from "next-intl"
import { usePathname, useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function LanguageToggle() {
    const locale = useLocale()
    const router = useRouter()
    const pathname = usePathname()

    const switchLocale = (newLocale: string) => {
        // This assumes the path starts with /locale (e.g., /en or /es)
        // We replace the current locale segment with the new one.
        // If the path is /en/projects, it becomes /es/projects.
        const newPath = pathname.replace(`/${locale}`, `/${newLocale}`)
        router.replace(newPath)
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="w-9 px-0 font-bold">
                    {locale.toUpperCase()}
                    <span className="sr-only">Toggle language</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => switchLocale("en")}>
                    English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => switchLocale("es")}>
                    Español
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
