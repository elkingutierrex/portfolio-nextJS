"use client"

import * as React from "react"
import { motion, useMotionValue, useTransform, useAnimationFrame } from "framer-motion"
import { Github, ExternalLink, ChevronLeft, ChevronRight, Trophy, Building2, Medal } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

import { Badge } from "@/components/ui/badge"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"

export function Projects() {
    const t = useTranslations('Projects')

    const projects = [
        {
            id: "bwork",
            tags: ["Angular", "TypeScript", "Jest", "Playwright"],
            // Software Dashboard UI - Desktop Workspace
            image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=800",
            links: { github: "https://github.com", demo: "https://vercel.com" },
            isTheBestApp: true,
        },
        {
            id: "inversiones",
            tags: ["Angular", "TypeScript", "Jasmine", "Java"],
            // Financial Chart Analytics - Dashboard
            image: "/project-ecommerce.png",
            links: { github: "https://github.com", demo: "https://vercel.com" },
        },
        {
            id: "tiquetera",
            tags: ["Angular", "TypeScript", "Jasmine", "Karma", ".NetCore", "SQL Server"],
            // Project Management / Productivity
            image: "/project-benefits.png",
            links: { github: "https://github.com", demo: "https://vercel.com" },
        },
        {
            id: "comisiones",
            tags: ["Angular", "AngularJS", "SQL Server", "NodeJS"],
            // Business Data Analysis
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
            links: { github: "https://github.com", demo: "https://vercel.com" },
        },
        {
            id: "precios",
            tags: ["Angular", "NodeJS", "SQL Server", "Stored Procedures"],
            // Software Update / Code
            image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
            links: { github: "https://github.com", demo: "https://vercel.com" },
        },
        {
            id: "portfolio",
            tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Shadcn/UI"],
            image: "/project-portfolio.png",
            links: { github: "https://github.com", demo: "https://vercel.com" },
            isTheBestApp: false,
        },
    ]

    // Duplicate projects to ensure seamless infinite scroll
    const carouselProjects = [...projects, ...projects]

    // Carousel Logic
    const containerRef = React.useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = React.useState(false);
    const [mouseFactor, setMouseFactor] = React.useState(0); // -1 (left) to 1 (right)
    const [manualDirection, setManualDirection] = React.useState(0); // -1 (left), 0 (none), 1 (right)

    // Percentage position (0 to -50)
    const baseX = useMotionValue(0);
    const x = useTransform(baseX, (v) => `${v}%`);

    useAnimationFrame((time, delta) => {
        let moveBy = 0;
        // Adjust these speeds to your liking
        const defaultSpeed = 0.005; // Very slow drift
        const maxHoverSpeed = 0.05; // Faster interactive speed
        const manualSpeed = 0.08; // Fast manual speed for buttons

        if (manualDirection !== 0) {
            // Manual Mode (Buttons)
            // manualDirection -1 (Left button clicked) -> Move content Right (positive) -> accelerate
            // manualDirection 1 (Right button clicked) -> Move content Left (negative) -> accelerate
            // Note: "Left" button implies "Show me previous stuff", which usually means moving content Right.
            // "Right" button implies "Show me next stuff", which means moving content Left.

            moveBy = -manualDirection * manualSpeed * (delta / 16);

        } else if (isHovered) {
            // Interactive Mode (Mouse)
            // factor > 0 (Right side) -> move Left (negative) -> accelerate
            // factor < 0 (Left side) -> move Right (positive) -> accelerate

            // If mouse is on Right (factor 1), we want to see more right content, so move content LEFT (-).
            moveBy = -mouseFactor * maxHoverSpeed * (delta / 16);
        } else {
            // Default Mode: Drift constantly to the left
            moveBy = -defaultSpeed * (delta / 16);
        }

        let newX = baseX.get() + moveBy;

        // Wrap logic for infinite scroll
        // The container is 200% width (2 sets). Range is 0% to -50% (showing 1st set to start of 2nd set)
        if (newX <= -50) {
            newX = 0;
        } else if (newX > 0) {
            newX = -50;
        }

        baseX.set(newX);
    });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left; // x position within the element.
        const width = rect.width;

        // Calculate factor from -1 (left) to 1 (right)
        // Center (width/2) should be 0.
        const normalized = (x - width / 2) / (width / 2);
        setMouseFactor(normalized);
    };

    return (
        <section id="projects" className="py-8 md:py-12 lg:py-24 bg-muted/50 overflow-hidden relative group/section">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="container mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center mb-10"
            >
                <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-6xl">
                    {t('title')}
                </h2>
                <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                    {t('description')}
                </p>
            </motion.div>

            {/* Carousel Container */}
            <div
                className="relative w-full cursor-grab active:cursor-grabbing"
                ref={containerRef}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onMouseMove={handleMouseMove}
            >
                {/* Gradient Masks for fade effect at edges */}
                <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

                <motion.div
                    className="flex gap-8 w-max px-8"
                    style={{ x }}
                >
                    {carouselProjects.map((project, index) => (
                        <div
                            key={`${project.id}-${index}`}
                            className="w-[350px] md:w-[400px] flex-shrink-0"
                        // Use pointer-events-auto to ensure buttons inside receive clicks, 
                        // but dragging the carousel usually requires preventing default on links if we were dragging.
                        // Here we are just hovering, so links should work fine.
                        >
                            <Card className="flex flex-col h-full overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow bg-card/50 backdrop-blur-sm group">
                                <div className="aspect-video w-full relative flex items-center justify-center overflow-hidden border-b border-border/10">
                                    <Image
                                        src={project.image}
                                        alt={t(`items.${project.id}.title`)}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    {/* Company Badge Overlay */}
                                    <div className="absolute top-2 left-2 z-20">
                                        <Badge variant="secondary" className="bg-background/80 backdrop-blur-md border-border/50 flex items-center gap-1.5 py-1 px-3">
                                            <Building2 className="h-3 w-3 text-primary" />
                                            {t(`items.${project.id}.company`)}
                                        </Badge>
                                    </div>
                                </div>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-xl font-bold">{t(`items.${project.id}.title`)}</CardTitle>
                                    <CardDescription className="line-clamp-3 text-sm leading-relaxed">
                                        {t(`items.${project.id}.description`)}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="flex-1 flex flex-col gap-4 pb-8">
                                    {/* Awards Section */}
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground/80">
                                            <Medal className={`h-4 w-4 ${project.isTheBestApp ? 'text-yellow-500 animate-pulse' : 'text-amber-500'}`} />
                                            {t('awards')}
                                        </div>

                                        <div className={`relative overflow-hidden border rounded-xl p-4 transition-all duration-300 ${project.isTheBestApp
                                            ? 'bg-gradient-to-br from-yellow-500/20 via-yellow-500/5 to-transparent border-yellow-400/30 shadow-[0_0_15px_rgba(250,204,21,0.1)]'
                                            : 'bg-amber-500/5 border-amber-500/10'
                                            }`}>
                                            {/* Shimmer Effect for Best App */}
                                            {project.isTheBestApp && (
                                                <motion.div
                                                    className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-yellow-400/10 to-transparent -translate-x-full"
                                                    animate={{ x: ['100%', '-100%'] }}
                                                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                                                />
                                            )}

                                            <div className={`relative z-10 text-xs italic flex items-start gap-2.5 ${project.isTheBestApp
                                                ? 'text-yellow-700 dark:text-yellow-400 font-semibold leading-relaxed'
                                                : 'text-amber-700 dark:text-amber-400'
                                                }`}>
                                                {project.isTheBestApp && (
                                                    <div className="mt-0.5 relative">
                                                        <Trophy className="h-4 w-4 text-yellow-500 dark:text-yellow-400 shrink-0 drop-shadow-[0_0_5px_rgba(250,204,21,0.5)]" />
                                                        <motion.div
                                                            className="absolute inset-0 bg-yellow-400/40 rounded-full blur-md"
                                                            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
                                                            transition={{ repeat: Infinity, duration: 2 }}
                                                        />
                                                    </div>
                                                )}
                                                <span>“{t(`items.${project.id}.awards.0`)}”</span>
                                            </div>

                                            {/* "Best App" floating badge for prominence */}
                                            {project.isTheBestApp && (
                                                <div className="mt-3 flex justify-end">
                                                    <Badge className="bg-yellow-500 hover:bg-yellow-600 text-black border-0 text-[10px] font-black uppercase tracking-tighter py-0 px-2 h-5 flex items-center gap-1 shadow-lg shadow-yellow-500/20">
                                                        Best Project
                                                    </Badge>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2 mt-auto">
                                        {project.tags.map((tag) => (
                                            <Badge key={tag} variant="outline" className="text-[10px] font-medium py-0 h-5">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Mobile Navigation Buttons */}
            <div className="flex justify-center gap-4 mt-8 lg:hidden">
                <Button
                    variant="outline"
                    size="icon"
                    className="h-12 w-12 rounded-full bg-background/80 backdrop-blur-sm border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground"
                    onTouchStart={() => setManualDirection(-1)}
                    onTouchEnd={() => setManualDirection(0)}
                    onMouseDown={() => setManualDirection(-1)}
                    onMouseUp={() => setManualDirection(0)}
                    onMouseLeave={() => setManualDirection(0)}
                    aria-label="Previous projects"
                >
                    <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    className="h-12 w-12 rounded-full bg-background/80 backdrop-blur-sm border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground"
                    onTouchStart={() => setManualDirection(1)}
                    onTouchEnd={() => setManualDirection(0)}
                    onMouseDown={() => setManualDirection(1)}
                    onMouseUp={() => setManualDirection(0)}
                    onMouseLeave={() => setManualDirection(0)}
                    aria-label="Next projects"
                >
                    <ChevronRight className="h-6 w-6" />
                </Button>
            </div>
        </section>
    )
}
