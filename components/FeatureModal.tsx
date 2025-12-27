"use client";

import { useState } from "react";

interface Feature {
    title: string;
    description: string;
    icon: string;
}

const features: Feature[] = [
    {
        title: "Pick Up",
        description: "Discover trending videos, featured creators, and community highlights all in one place.",
        icon: "✨",
    },
    {
        title: "Ratio",
        description: "Explore interactive data visualizations of global population and ideological shifts.",
        icon: "�",
    },
    {
        title: "Story",
        description: "Share your personal journey and connect with others through our interactive story feed.",
        icon: "📖",
    },
];

import { useRouter } from "next/navigation";

interface FeatureModalProps {
    onClose: () => void;
}

export default function FeatureModal({ onClose }: FeatureModalProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const router = useRouter();

    const nextSlide = () => {
        if (currentIndex < features.length - 1) {
            setCurrentIndex((prev) => prev + 1);
        }
    };

    const prevSlide = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prev) => prev - 1);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity">
            <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white p-6 shadow-2xl dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
                >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="mt-8 flex flex-col items-center text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-3xl dark:bg-blue-900/30">
                        {features[currentIndex].icon}
                    </div>
                    <h2 className="mt-6 text-2xl font-bold text-gray-900 dark:text-white">
                        {features[currentIndex].title}
                    </h2>
                    <p className="mt-4 text-gray-500 dark:text-gray-400">
                        {features[currentIndex].description}
                    </p>
                </div>

                <div className="mt-8 flex items-center justify-between">
                    <button
                        onClick={prevSlide}
                        disabled={currentIndex === 0}
                        className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${currentIndex === 0
                            ? "cursor-not-allowed text-zinc-300 dark:text-zinc-700"
                            : "text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20"
                            }`}
                    >
                        Back
                    </button>

                    <div className="flex gap-1">
                        {features.map((_, idx) => (
                            <div
                                key={idx}
                                className={`h-2 w-2 rounded-full transition-all ${idx === currentIndex ? "bg-blue-600 w-4" : "bg-zinc-300 dark:bg-zinc-700"
                                    }`}
                            />
                        ))}
                    </div>

                    {currentIndex === features.length - 1 ? (
                        <button
                            onClick={() => router.push('/ratio')}
                            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
                        >
                            Get Started
                        </button>
                    ) : (
                        <button
                            onClick={nextSlide}
                            className="rounded-lg px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20 transition-colors"
                        >
                            Next
                        </button>
                    )}

                </div>
            </div>
        </div>
    );
}
