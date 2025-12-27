"use client";

import { useState } from "react";
import Image from "next/image";

// Mock Data
const PICK_UP_VIDEOS = [
    {
        id: 1,
        title: "The Future of AI Art Generation",
        channel: "Tech Visionary",
        thumbnail: "https://placehold.co/600x400/2563eb/white?text=AI+Art",
        views: "1.2M",
    },
    {
        id: 2,
        title: "Synthetica Review: Game Changer?",
        channel: "CodeLife",
        thumbnail: "https://placehold.co/600x400/7c3aed/white?text=Review",
        views: "850K",
    },
    {
        id: 3,
        title: "Neural Networks Explained",
        channel: "DeepDive",
        thumbnail: "https://placehold.co/600x400/db2777/white?text=Neural+Net",
        views: "2.1M",
    },
    {
        id: 4,
        title: "10 Tips for Better Prompts",
        channel: "PromptMaster",
        thumbnail: "https://placehold.co/600x400/059669/white?text=Prompts",
        views: "500K",
    },
];

const PICK_UP_YOUTUBERS = [
    {
        id: 1,
        name: "Sarah Jenkins",
        bio: "AI Researcher & Tech Reviewer. Exploring the boundaries of synthetic media.",
        subscribers: "2.5M",
        avatar: "https://placehold.co/200x200/2563eb/white?text=SJ",
    },
    {
        id: 2,
        name: "David Chen",
        bio: "Full Stack Dev building the future. Tutorials on Next.js, Go, and AI integration.",
        subscribers: "1.8M",
        avatar: "https://placehold.co/200x200/7c3aed/white?text=DC",
    },
    {
        id: 3,
        name: "Creative Minds",
        bio: "A collective of digital artists using generative tools to tell stories.",
        subscribers: "900K",
        avatar: "https://placehold.co/200x200/db2777/white?text=CM",
    },
];

const TRENDING_STORIES = [
    {
        id: 1,
        user: "Alex Rivera",
        excerpt: "I never thought I could create music, but Synthetica's audio engine helped me compose my first symphony.",
        likes: 1240,
        comments: 342,
    },
    {
        id: 2,
        user: "Maria Gonzalez",
        excerpt: "Using the new visualizer for my classroom changed how students understand complex data. Pure magic.",
        likes: 890,
        comments: 156,
    },
    {
        id: 3,
        user: "Jordan Lee",
        excerpt: "The collab feature is insane. Connecting with other creators instantly has boosted my workflow 10x.",
        likes: 2100,
        comments: 560,
    },
    {
        id: 4,
        user: "TechDaily",
        excerpt: "Reviewing the API documentation... the Go implementation is incredibly robust. Kudos to the team.",
        likes: 450,
        comments: 89,
    },
];

type Tab = "Videos" | "Creators" | "Stories";

export default function PickUpPage() {
    const [activeTab, setActiveTab] = useState<Tab>("Videos");

    return (
        <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-black pt-20 pb-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
                <header className="mb-10 text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-5xl">
                        Key Contributors to Antinatalism
                    </h1>
                    <p className="mt-4 text-xl text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto">
                        The evolution of antinatalist thought depends on the courage of those who speak their truth. This curated list features the essential voices currently driving our philosophy forward. Engage with their content, reflect on their insights, and join us in refining a perspective that deeply honors the ethics of existence.
                    </p>
                </header>

                <div className="flex justify-center mb-12">
                    <div className="inline-flex rounded-lg border border-zinc-200 bg-white p-1 dark:border-zinc-800 dark:bg-zinc-900 shadow-sm">
                        <button
                            onClick={() => setActiveTab("Videos")}
                            className={`px-6 py-2.5 text-sm font-medium rounded-md transition-all ${activeTab === "Videos"
                                ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-white shadow-sm"
                                : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                                }`}
                        >
                            Trending Videos
                        </button>
                        <button
                            onClick={() => setActiveTab("Creators")}
                            className={`px-6 py-2.5 text-sm font-medium rounded-md transition-all ${activeTab === "Creators"
                                ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-white shadow-sm"
                                : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                                }`}
                        >
                            Featured Creators
                        </button>
                        <button
                            onClick={() => setActiveTab("Stories")}
                            className={`px-6 py-2.5 text-sm font-medium rounded-md transition-all ${activeTab === "Stories"
                                ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-white shadow-sm"
                                : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                                }`}
                        >
                            Community Stories
                        </button>
                    </div>
                </div>

                <div className="min-h-[400px]">
                    {/* Videos Tab */}
                    {activeTab === "Videos" && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in zoom-in duration-300">
                            {PICK_UP_VIDEOS.map((video) => (
                                <div key={video.id} className="group relative overflow-hidden rounded-xl bg-white dark:bg-zinc-900 shadow-sm transition-all hover:shadow-md border border-zinc-100 dark:border-zinc-800">
                                    <div className="relative aspect-video w-full overflow-hidden bg-zinc-200 dark:bg-zinc-800">
                                        <iframe
                                            width="100%"
                                            height="100%"
                                            src="https://www.youtube.com/embed/okPLlbtL8oQ"
                                            title={video.title}
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            className="absolute top-0 left-0 h-full w-full"
                                        ></iframe>
                                    </div>
                                    <div className="p-4">
                                        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white line-clamp-2">
                                            {video.title}
                                        </h3>
                                        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                                            {video.channel} • {video.views} views
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Creators Tab */}
                    {activeTab === "Creators" && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in zoom-in duration-300">
                            {PICK_UP_YOUTUBERS.map((youtuber) => (
                                <div key={youtuber.id} className="flex items-center space-x-4 rounded-xl bg-white p-6 dark:bg-zinc-900 shadow-sm transition-colors hover:bg-zinc-50 hover:dark:bg-zinc-800/80 border border-zinc-100 dark:border-zinc-800">
                                    <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-full border border-zinc-200 dark:border-zinc-700">
                                        <Image
                                            src={youtuber.avatar}
                                            alt={youtuber.name}
                                            fill
                                            className="object-cover"
                                            unoptimized
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-xl font-bold text-zinc-900 dark:text-white truncate">
                                            {youtuber.name}
                                        </h3>
                                        <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                                            {youtuber.subscribers} Subscribers
                                        </p>
                                        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                                            {youtuber.bio}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Stories Tab */}
                    {activeTab === "Stories" && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in zoom-in duration-300">
                            {TRENDING_STORIES.map((story) => (
                                <div key={story.id} className="rounded-xl border border-zinc-100 bg-white p-8 dark:bg-zinc-900 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow">
                                    <p className="mb-6 text-lg italic text-zinc-600 dark:text-zinc-300 leading-relaxed">
                                        "{story.excerpt}"
                                    </p>
                                    <div className="flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800 pt-4">
                                        <span className="font-semibold text-zinc-900 dark:text-white">
                                            @{story.user}
                                        </span>
                                        <div className="flex space-x-4 text-sm text-zinc-500">
                                            <span className="flex items-center gap-1">
                                                ❤️ {story.likes}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                💬 {story.comments}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
