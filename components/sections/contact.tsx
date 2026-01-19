"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Mail } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useTranslations } from "next-intl"

export function Contact() {
    const t = useTranslations('Contact')
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    })
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!formData.name || !formData.email || !formData.message) {
            setStatus('error')
            return
        }

        // Construct mailto link
        const subject = `Portfolio Contact: ${formData.name}`
        const body = `Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0A%0D%0AMessage:%0D%0A${formData.message}`
        window.location.href = `mailto:egx.innovation@gmail.com?subject=${subject}&body=${body}`

        setStatus('success')
        // Optional: clear form after a delay or immediately
        setFormData({ name: "", email: "", message: "" })
        setTimeout(() => setStatus('idle'), 5000)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }))
        if (status !== 'idle') setStatus('idle')
    }

    return (
        <section id="contact" className="container py-8 md:py-12 lg:py-24">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center"
            >
                <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-6xl">
                    {t('title')}
                </h2>
                <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                    {t('description')}
                </p>
            </motion.div>

            <div className="mx-auto grid max-w-5xl gap-8 py-12 md:grid-cols-2">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    <Card>
                        <CardHeader>
                            <CardTitle>{t('form.title')}</CardTitle>
                            <CardDescription>
                                {t('form.description')}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="grid gap-4">
                                <div className="grid gap-2">
                                    <label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                        {t('form.name')}
                                    </label>
                                    <Input
                                        id="name"
                                        placeholder={t('form.placeholders.name')}
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                        {t('form.email')}
                                    </label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder={t('form.placeholders.email')}
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <label htmlFor="message" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                        {t('form.message')}
                                    </label>
                                    <Textarea
                                        id="message"
                                        placeholder={t('form.placeholders.message')}
                                        value={formData.message}
                                        onChange={handleChange}
                                    />
                                </div>
                                <Button className="w-full" type="submit">{t('form.send')}</Button>
                                {status === 'success' && (
                                    <p className="text-sm font-medium text-green-500 text-center animate-in fade-in slide-in-from-top-2">
                                        {t('form.success')}
                                    </p>
                                )}
                                {status === 'error' && (
                                    <p className="text-sm font-medium text-destructive text-center animate-in fade-in slide-in-from-top-2">
                                        {t('form.error')}
                                    </p>
                                )}
                            </form>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="flex flex-col justify-center space-y-6 pl-0 md:pl-10"
                >
                    <div>
                        <h3 className="text-xl font-bold">{t('details')}</h3>
                        <p className="text-muted-foreground mt-2">
                            Colombia<br />
                            egx.innovation@gmail.com
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold">{t('socials')}</h3>
                        <div className="flex gap-4 mt-4">
                            <Link href="https://github.com/elkingutierrex" target="_blank">
                                <Button variant="outline" size="icon">
                                    <Github className="h-5 w-5" />
                                    <span className="sr-only">GitHub</span>
                                </Button>
                            </Link>
                            <Link href="https://linkedin.com/in/elkingutierrex" target="_blank">
                                <Button variant="outline" size="icon">
                                    <Linkedin className="h-5 w-5" />
                                    <span className="sr-only">LinkedIn</span>
                                </Button>
                            </Link>
                            <Link href="mailto:egx.innovation@gmail.com">
                                <Button variant="outline" size="icon">
                                    <Mail className="h-5 w-5" />
                                    <span className="sr-only">Email</span>
                                </Button>
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
