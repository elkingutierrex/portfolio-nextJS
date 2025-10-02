"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { href: "#about", label: { es: "Sobre mí", en: "About me" } },
  { href: "#skills", label: { es: "Habilidades", en: "Skills" } },
  { href: "#experience", label: { es: "Experiencia", en: "Experience" } },
  { href: "#projects", label: { es: "Proyectos", en: "Projects" } },
  { href: "#awards", label: { es: "Premios", en: "Awards" } },
  { href: "#contact", label: { es: "Contáctame", en: "Contact me" } },
];

export default function Header() {
  const pathname = usePathname();
  
  const currentLang = pathname.startsWith("/en") ? "en" : "es";

  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-4 py-3">
        
        <Link href="/" className="text-xl font-bold">
          Portfolio
        </Link>

        {/* Navegación */}
        <nav className="hidden md:flex gap-6">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="hover:text-blue-500 transition-colors"
            >
              {item.label[currentLang as "es" | "en"]}
            </a>
          ))}
        </nav>
        
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
