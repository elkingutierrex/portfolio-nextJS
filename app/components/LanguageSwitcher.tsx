"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function LanguageSwitcher() {
  const pathname = usePathname();

  const segments = pathname.split('/');
  const currentLocale = segments[1];
  const otherLocale = currentLocale === 'en' ? 'es' : 'en';
  const newPath = '/' + [otherLocale, ...segments.slice(2)].join('/');

  return (
    <Link
      href={newPath}
      className="px-2 py-1 border rounded text-sm hover:bg-gray-200 dark:hover:bg-gray-700"
    >
      {otherLocale.toUpperCase()}
    </Link>
  );
}
