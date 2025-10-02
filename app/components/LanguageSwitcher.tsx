"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function LanguageSwitcher() {
  const pathname = usePathname();

  const isEnglish = pathname.startsWith("/en");
  const newPath = isEnglish ? pathname.replace("/en", "/es") : `/en${pathname}`;

  return (
    <Link
      href={newPath}
      className="px-2 py-1 border rounded text-sm hover:bg-gray-200 dark:hover:bg-gray-700"
    >
      {isEnglish ? "ES" : "EN"}
    </Link>
  );
}
