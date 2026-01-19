"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { useTranslations } from "next-intl"
import Image from "next/image"
import { useState, useEffect } from "react"

import { Button } from "@/components/ui/button"

export function Hero() {
    const t = useTranslations('Hero')

    // Advanced Typewriter state
    const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {
        const fullText = "elkingutierrez";
        const correction = "x";
        let isMounted = true;

        const loopAnimation = async () => {
            while (isMounted) {
                // 1. Type "elkingutierrez"
                for (let i = 0; i <= fullText.length; i++) {
                    if (!isMounted) return;
                    setDisplayedText(fullText.slice(0, i));
                    await new Promise(r => setTimeout(r, 100));
                }

                // Wait after typing full name
                if (!isMounted) return;
                await new Promise(r => setTimeout(r, 1000));

                // 2. Delete "z" (last char)
                if (!isMounted) return;
                setDisplayedText(fullText.slice(0, -1));
                await new Promise(r => setTimeout(r, 200));

                // 3. Type "x"
                if (!isMounted) return;
                setDisplayedText(fullText.slice(0, -1) + correction);

                // Wait showing the final corrected name
                if (!isMounted) return;
                await new Promise(r => setTimeout(r, 3000));

                // 4. Delete everything to restart loop
                for (let i = fullText.length; i >= 0; i--) {
                    if (!isMounted) return;
                    setDisplayedText(fullText.slice(0, i));
                    await new Promise(r => setTimeout(r, 50)); // Faster deletion
                }

                // Small pause before restarting
                await new Promise(r => setTimeout(r, 500));
            }
        };

        loopAnimation();

        return () => { isMounted = false; };
    }, []);

    return (
        <section id="hero" className="container grid lg:grid-cols-2 items-center gap-10 pb-8 pt-24 md:pt-32 min-h-screen">
            <div className="flex flex-col items-start gap-6 z-10 order-2 lg:order-1">
                {/* Glass Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-primary-foreground backdrop-blur-md shadow-[0_0_20px_rgba(124,58,237,0.2)]">
                        <span className="flex h-2 w-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
                        {t('title2')}
                    </div>
                </motion.div>

                {/* Main Heading with Typewriter */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-5xl font-black leading-tight tracking-tight md:text-7xl lg:text-8xl"
                >
                    {t('title1')} <br />
                    {/* Red to Blue Gradient as requested */}
                    <span className="bg-gradient-to-r from-red-600 via-purple-500 to-blue-600 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(124,58,237,0.5)]">
                        {displayedText}
                        <span className="animate-pulse">|</span>
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="max-w-[600px] text-lg text-muted-foreground md:text-xl leading-relaxed"
                >
                    {t('description')}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex flex-wrap gap-4 mt-2"
                >
                    <Link href="#contact">
                        <Button size="lg" className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold px-8 h-12 shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] transition-all">
                            {t('letsConnect')} <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </Link>
                    <Link href="#projects">
                        <Button variant="outline" size="lg" className="rounded-full border-border/50 bg-background/20 text-foreground hover:bg-background/40 h-12 px-8 backdrop-blur-sm shadow-sm">
                            {t('viewProjects')}
                        </Button>
                    </Link>
                </motion.div>
            </div>

            {/* Coin Flip Container - Reduced size and Centered */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative flex items-center justify-center h-full order-1 lg:order-2"
            >
                {/* Background Glows */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-indigo-500/10 rounded-full blur-[100px] -z-10" />

                <div className="relative z-10 w-[210px] h-[210px] md:w-[350px] md:h-[350px] flex items-center justify-center perspective-1000">
                    {/* Coin Flip Wrapper */}
                    <div className="animate-coin-flip w-full h-full relative preserve-3d">
                        {/* Front Side (Logo) */}
                        <div className="absolute inset-0 backface-hidden">
                            <Image
                                src="/logo.png"
                                alt="Logo Elkin Gutierrex"
                                fill
                                className="object-contain drop-shadow-[0_0_50px_rgba(124,58,237,0.5)] rounded-full"
                            />
                        </div>
                        {/* Back Side (Profile) - Rotated 180deg start */}
                        <div className="absolute inset-0 backface-hidden rotate-y-180">
                            <Image
                                src="/profile-back.png"
                                alt="Profile Elkin Gutierrex"
                                fill
                                className="object-cover rounded-full border-4 border-white/20"
                            />
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    )
}
