"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, Github, Linkedin, Mail } from "lucide-react"
import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import { LanguageToggle } from "@/components/language-toggle"
import { ModeToggle } from "@/components/ui/theme-toggle"

export function Navbar() {
    const [isOpen, setIsOpen] = React.useState(false)
    const t = useTranslations('Navbar')

    const links = [
        { href: "#hero", label: t('home') },
        { href: "#skills", label: t('skills') },
        { href: "#projects", label: t('projects') },
        { href: "#contact", label: t('contact') },
    ]

    return (
        <nav className="fixed top-0 z-50 w-full pt-6 px-1 md:px-4">
            <div className="px-4 md:px-6 lg:container mx-auto flex items-center justify-between rounded-full border border-border/50 bg-background/60 px-6 py-3 backdrop-blur-xl shadow-lg supports-[backdrop-filter]:bg-background/40">
                {/* Logo Area */}
                <Link href="/" className="flex items-center space-x-2">
                    <img src="/logo.png" alt="Logo" className="h-10 w-10 min-w-10 rounded-full border border-white/20" />
                    <span className=" font-bold sm:inline-block text-foreground tracking-wide">
                        elkingutierrex
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-8">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors hover:shadow-[0_0_15px_rgba(147,51,234,0.5)]"
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* Right Side: Socials + Utils */}
                <div className="flex items-center gap-3">
                    <div className="hidden sm:flex items-center gap-2 border-r border-border/50 pr-4 mr-2">
                        <Link href="https://github.com/elkingutierrex" target="_blank" className="text-muted-foreground hover:text-primary transition-transform hover:scale-110">
                            <div className="p-2 rounded-full bg-secondary/50 hover:bg-secondary border border-border/20">
                                <Github className="h-4 w-4" />
                            </div>
                        </Link>
                        <Link href="https://linkedin.com/in/elkingutierrex" target="_blank" className="text-muted-foreground hover:text-primary transition-transform hover:scale-110">
                            <div className="p-2 rounded-full bg-secondary/50 hover:bg-secondary border border-border/20">
                                <Linkedin className="h-4 w-4" />
                            </div>
                        </Link>
                    </div>

                    <LanguageToggle />
                    <ModeToggle />

                    {/* Mobile Menu Trigger */}
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button
                                variant="ghost"
                                className="px-0 text-foreground hover:bg-transparent md:hidden"
                            >
                                <Menu className="h-6 w-6" />
                                <span className="sr-only">{t('toggleMenu')}</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="bg-background/90 border-l border-border/50 backdrop-blur-xl">
                            <div className="flex flex-col space-y-6 mt-10">
                                {links.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className="text-lg font-medium text-muted-foreground hover:text-primary"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </nav>
    )
}
