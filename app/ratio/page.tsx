"use client";

import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { useRouter } from "next/navigation";
import QuestionnaireModal from "@/components/QuestionnaireModal";

// World Population approximate distribution
// Asia: ~60%, Africa: ~17%, Europe: ~10%, Americas: ~8%, Oceania: ~5% (simplified for chart clarity)
const worldData = [
    { name: "Asia", value: 60, color: "#3b82f6" }, // Blue
    { name: "Africa", value: 17, color: "#10b981" }, // Green
    { name: "Europe", value: 10, color: "#f59e0b" }, // Amber
    { name: "Americas", value: 12, color: "#ef4444" }, // Red
    { name: "Oceania", value: 1, color: "#8b5cf6" }, // Purple
];

// Antinatalist overlay data (15% vs 85% Rest of World)
const antinatalistData = [
    { name: "Antinatalist", value: 15, color: "#000000" }, // Black for emphasis
    { name: "Rest of World", value: 85, color: "#e5e7eb" }, // Light Gray to fade out
];

export default function RatioPage() {
    const [showOverride, setShowOverride] = useState(false);
    const [showQuestionnaire, setShowQuestionnaire] = useState(false);
    const [hasAnswered, setHasAnswered] = useState(false);
    const [userAnswer, setUserAnswer] = useState<number | null>(null);
    const router = useRouter();

    const answerMap: Record<number, string> = {
        1: "Antinatalist",
        2: "Child-free",
        3: "Planning/Have Children"
    };

    useEffect(() => {
        // Trigger animation after component mount + delay
        const timer = setTimeout(() => {
            setShowOverride(true);
        }, 2000); // 2 second delay before "invasion"

        // Check questionnaire status
        const checkStatus = async () => {
            try {
                const response = await fetch("http://localhost:8080/questionnaire/status", {
                    credentials: "include", // Send cookies
                });
                if (response.ok) {
                    const data = await response.json();
                    console.log("Questionnaire Status:", data); // Debug log
                    if (data.answered) {
                        setHasAnswered(true);
                        setUserAnswer(data.user_answer);
                    } else {
                        // Delay modal slightly to let user see page? Or show immediately?
                        // Let's show immediately on load if logic permits, or maybe after a small delay.
                        // For now, immediately.
                        setShowQuestionnaire(true);
                    }
                } else {
                    console.error("Failed to fetch status:", response.status, response.statusText);
                }
            } catch (error) {
                console.error("Failed to check status", error);
            }
        };
        checkStatus();

        return () => clearTimeout(timer);
    }, []);

    const handleQuestionnaireSuccess = () => {
        setHasAnswered(true);
        setShowQuestionnaire(false);
        // We could refetch or just set state if we knew what they picked.
        // For now, simple reload or we can pass the answer up from modal?
        // Let's just reload to fetch fresh state.
        window.location.reload();
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black p-4 relative">
            {/* Status Indicator */}
            {hasAnswered && (
                <div className="absolute top-4 right-4 flex flex-col items-end space-y-1 animate-in fade-in slide-in-from-top-2">
                    <div className="flex items-center space-x-2 bg-green-100 dark:bg-green-900/30 px-3 py-1.5 rounded-full border border-green-200 dark:border-green-800">
                        <span className="text-xl">✅</span>
                        <span className="text-sm font-medium text-green-700 dark:text-green-300">
                            Status Recorded
                        </span>
                    </div>
                    {userAnswer && (
                        <div className="text-xs text-zinc-500 dark:text-zinc-400 font-medium bg-white/50 dark:bg-black/50 px-2 py-1 rounded-md backdrop-blur-sm">
                            You selected: <span className="text-blue-600 dark:text-blue-400">{answerMap[userAnswer]}</span>
                        </div>
                    )}
                </div>
            )}

            {/* Questionnaire Modal */}
            {showQuestionnaire && (
                <QuestionnaireModal
                    onClose={() => setShowQuestionnaire(false)}
                    onSuccess={handleQuestionnaireSuccess}
                />
            )}

            <main className="flex w-full max-w-4xl flex-col items-center gap-8 text-center">
                <h1 className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-500">
                    World Population & Ideology
                </h1>

                <div className="relative h-[400px] w-full max-w-[600px]">
                    {/* Base Chart: World Population */}
                    <div className={`absolute inset-0 transition-opacity duration-1000 ${showOverride ? "opacity-30 blur-sm" : "opacity-100"}`}>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={worldData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={80}
                                    outerRadius={140}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {worldData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Legend verticalAlign="bottom" height={36} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Overlay Chart: Antinatalist Override */}
                    <div
                        className={`absolute inset-0 transition-all duration-1000 transform ${showOverride ? "scale-100 opacity-100" : "scale-90 opacity-0 pointer-events-none"
                            }`}
                    >
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={antinatalistData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={0} // Full pie for impact, or ring? Let's do Ring for style.
                                    outerRadius={150}
                                    dataKey="value"
                                    stroke="none"
                                    startAngle={90}
                                    endAngle={450}
                                >
                                    <Cell fill="#18181b" /> {/* Dark Zinc/Black */}
                                    <Cell fill="transparent" strokeDasharray="5 5" stroke="#9ca3af" /> {/* Transparent for Rest */}
                                </Pie>
                                {/* Label for Antinatalist */}
                            </PieChart>
                        </ResponsiveContainer>
                        {showOverride && (
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="text-center animate-pulse">
                                    <h2 className="text-5xl font-black text-black dark:text-white drop-shadow-xl">
                                        15%
                                    </h2>
                                    <p className="text-xl font-bold text-gray-800 dark:text-gray-200 uppercase tracking-widest">
                                        Antinatalist
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-8 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
                    <p>
                        Current data suggests a significant shift.
                    </p>
                </div>

                <button
                    onClick={() => router.push("/hello")}
                    className="rounded-full bg-zinc-200 px-6 py-2 text-sm font-semibold text-zinc-900 transition-colors hover:bg-zinc-300 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
                >
                    Back to Hello
                </button>
            </main>
        </div>
    );
}
