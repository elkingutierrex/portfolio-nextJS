"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useTranslations } from "next-intl"

const skills: Record<string, string[]> = {
    Frontend: ["Angular", "AngularJS", "React", "JavaScript", "Ionic", "Next.js"],
    Backend: ["Node.js", "C# (.NET Core)"],
    Testing: ["Jest", "Jasmine", "Karma", "Playwright"],
    Databases: ["SQL Server", "Firebase", "MongoDB"],
    MethodologiesTools: ["Scrum", "Kanban", "Jira", "Azure DevOps", "AWS", "Bootstrap", "AI"],
}

export function Skills() {
    const t = useTranslations('Skills')
    const categories = ["Frontend", "Backend", "Testing", "Databases", "MethodologiesTools"] as const

    return (
        <section id="skills" className="container py-8 md:py-12 lg:py-24">
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

            <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3 lg:gap-8 mt-8">
                {categories.map((category, index) => (
                    <motion.div
                        key={category}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                    >
                        <Card className="h-full">
                            <CardHeader>
                                <CardTitle>{t(`categories.${category}`)}</CardTitle>
                                <CardDescription>
                                    {t(`descriptions.${category}`)}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex flex-wrap gap-2">
                                {skills[category].map((skill) => (
                                    <Badge key={skill} variant="secondary">
                                        {skill}
                                    </Badge>
                                ))}
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}
