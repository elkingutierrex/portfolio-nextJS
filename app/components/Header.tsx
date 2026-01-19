"use client";
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const locale = pathname.split('/')[1]; // "en" o "es"

  const navItems = [
    { href: '#about', label: t('about') },
    { href: '#skills', label: t('skills') },
    { href: '#experience', label: t('experience') },
    { href: '#projects', label: t('projects') },
    { href: '#awards', label: t('awards') },
    { href: '#contact', label: t('contact') }
  ];

  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-4 py-3">
        <Link href={`/${locale}`} className="text-xl font-bold">
          {t('about')} {/* ejemplo, luego podemos cambiar */}
        </Link>

        <nav className="hidden md:flex gap-6">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="hover:text-blue-500">
              {item.label}
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
