"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar() {
    const pathname = usePathname();

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
                {/* Mobile menu button could go here, omitting for simplicity in this iteration unless requested */}
            </div>
        </nav>
    );
}
