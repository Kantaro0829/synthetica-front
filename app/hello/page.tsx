"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FeatureModal from "@/components/FeatureModal";

export default function HelloPage() {
    const [userName, setUserName] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const router = useRouter();

    useEffect(() => {
        // Simple cookie parser to get user info if needed, or just display the message
        // Ideally we would fetch user details from an API using the cookie
        const match = document.cookie.match(new RegExp("(^| )user_id=([^;]+)"));
        if (!match) {
            // If no user_id cookie, maybe redirect back to login? 
            // For this task just showing the message is fine, but good UX would protect this route.
            // letting it be for now as per simple requirement.
        } else {
            setUserName(match[2]);
        }
    }, []);

    return (
        <>
            <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black">
                <main className="flex flex-col items-center gap-6 text-center">
                    <h1 className="text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400">
                        Hello It's Synthetica
                    </h1>
                    <p className="text-xl text-zinc-600 dark:text-zinc-400">
                        Welcome back to our shared space.
                    </p>
                    <button
                        onClick={() => setShowModal(true)}
                        className="mt-8 rounded-full bg-blue-600 px-8 py-3 text-lg font-bold text-white transition-all hover:bg-blue-700 hover:scale-105 shadow-lg shadow-blue-500/30"
                    >
                        Start Now
                    </button>
                    <button
                        onClick={() => router.push("/")}
                        className="rounded-full bg-zinc-200 px-6 py-2 text-sm font-semibold text-zinc-900 transition-colors hover:bg-zinc-300 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
                    >
                        Back to Home
                    </button>
                </main>
            </div>
            {showModal && <FeatureModal onClose={() => setShowModal(false)} />}
        </>
    );
}
