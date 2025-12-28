"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function NavBar() {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navItems = [
        { name: "Pick Up", path: "/pick-up" },
        { name: "Hello", path: "/hello" },
        { name: "Ratio", path: "/ratio" },
        { name: "Story", path: "/story" },
        { name: "About Synthetica", path: "/about" },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-black/80">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <div className="flex items-center">
                    <Link href="/" className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                        Synthetica
                    </Link>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                        {navItems.map((item) => {
                            const isActive = pathname === item.path;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.path}
                                    className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${isActive
                                        ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-white"
                                        : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white"
                                        }`}
                                >
                                    {item.name}
                                </Link>
                            );
                        })}
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="inline-flex items-center justify-center rounded-md p-2 text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800"
                        aria-expanded={isMenuOpen}
                    >
                        <span className="sr-only">Open main menu</span>
                        {!isMenuOpen ? (
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        ) : (
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="md:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black">
                    <div className="space-y-1 px-2 pb-3 pt-2">
                        {navItems.map((item) => {
                            const isActive = pathname === item.path;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.path}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={`block rounded-md px-3 py-2 text-base font-medium transition-colors ${isActive
                                        ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-white"
                                        : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white"
                                        }`}
                                >
                                    {item.name}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            )}
        </nav>
    );
}
