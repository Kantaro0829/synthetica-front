"use client";

import { useState } from "react";

interface Comment {
    id: number;
    user: string;
    text: string;
}

interface Post {
    id: number;
    title: string;
    content: string;
    author: string;
    date: string;
    comments: Comment[];
}

const MOCK_POSTS: Post[] = [
    {
        id: 1,
        title: "From Sketch to Symphony: My Journey with Synthetica",
        content: "I've always had melodies in my head but never knew how to transcribe them. Synthetica's audio engine took my hummed notes and turned them into a full orchestral arrangement. It's not just a tool; it's a collaborator that speaks my language.",
        author: "MelodyMaker",
        date: "Oct 12, 2024",
        comments: [
            { id: 101, user: "AudioPhile", text: "This is inspiring! Did you use the new harmonics plugin?" },
            { id: 102, user: "MelodyMaker", text: "Yes! It added so much depth to the strings section." }
        ]
    },
    {
        id: 2,
        title: "Breaking Writer's Block with AI Prompts",
        content: "I was stuck on Chapter 5 of my sci-fi novel for weeks. One session with the creative writing assistant helped me visualize the alien landscape I was trying to describe. The descriptive power is unmatched.",
        author: "SciFiScribe",
        date: "Nov 03, 2024",
        comments: [
            { id: 201, user: "ReadMore", text: "Can't wait to read the final book!" },
            { id: 202, user: "PenPal", text: "I struggle with landscapes too. Giving this a try." }
        ]
    },
    {
        id: 3,
        title: "Visualizing Data for Non-Profits",
        content: "We needed to show our donors exactly where their money was going. Synthetica's visualization tools allowed us to turn dry spreadsheets into an interactive 3D map of our impact. Donations are up 20% this quarter.",
        author: "NGO_Tech",
        date: "Nov 15, 2024",
        comments: [
            { id: 301, user: "DataWiz", text: "That's a powerful use case. Well done." }
        ]
    }
];

type Tab = "YourStory" | "AllStories";

export default function StoryList() {
    const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);
    const [expandedPostIds, setExpandedPostIds] = useState<Set<number>>(new Set());
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newTitle, setNewTitle] = useState("");
    const [newContent, setNewContent] = useState("");
    const [activeTab, setActiveTab] = useState<Tab>("YourStory");

    const togglePost = (id: number) => {
        const newExpanded = new Set(expandedPostIds);
        if (newExpanded.has(id)) {
            newExpanded.delete(id);
        } else {
            newExpanded.add(id);
        }
        setExpandedPostIds(newExpanded);
    };

    const handlePost = () => {
        if (!newTitle.trim() || !newContent.trim()) return;

        const newPost: Post = {
            id: Date.now(), // Simpe ID generation
            title: newTitle,
            content: newContent,
            author: "You", // Default author
            date: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
            comments: []
        };

        setPosts([newPost, ...posts]);
        setNewTitle("");
        setNewContent("");
        setIsModalOpen(false);
        setActiveTab("AllStories"); // Switch to list view
    };

    const handleCancel = () => {
        setNewTitle("");
        setNewContent("");
        setIsModalOpen(false);
    };

    return (
        <div className="w-full max-w-2xl space-y-4">
            {/* Tab Navigation */}
            {/* Tab Navigation */}
            <div className="flex justify-center mb-8">
                <div className="inline-flex rounded-lg border border-zinc-200 bg-white p-1 dark:border-zinc-800 dark:bg-zinc-900 shadow-sm">
                    <button
                        onClick={() => setActiveTab("YourStory")}
                        className={`px-6 py-2.5 text-sm font-medium rounded-md transition-all ${activeTab === "YourStory"
                            ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-white shadow-sm"
                            : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                            }`}
                    >
                        Your Story
                    </button>
                    <button
                        onClick={() => setActiveTab("AllStories")}
                        className={`px-6 py-2.5 text-sm font-medium rounded-md transition-all ${activeTab === "AllStories"
                            ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-white shadow-sm"
                            : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                            }`}
                    >
                        Story of Everyone
                    </button>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                    <div className="w-full max-w-lg bg-white dark:bg-zinc-900 rounded-xl shadow-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800">
                        <div className="p-6">
                            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">Share Your Experience</h3>

                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="title" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        id="title"
                                        value={newTitle}
                                        onChange={(e) => setNewTitle(e.target.value)}
                                        className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        placeholder="Give your story a title"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="content" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                                        Detail
                                    </label>
                                    <textarea
                                        id="content"
                                        value={newContent}
                                        onChange={(e) => setNewContent(e.target.value)}
                                        rows={4}
                                        className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        placeholder="What's your story?"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="bg-zinc-50 dark:bg-zinc-800/50 px-6 py-4 flex justify-end space-x-3">
                            <button
                                onClick={handleCancel}
                                className="px-4 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handlePost}
                                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={!newTitle.trim() || !newContent.trim()}
                            >
                                Post It
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Tab: Your Story */}
            {activeTab === "YourStory" && (
                <div className="flex flex-col items-center justify-center py-20 animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <p className="text-zinc-600 dark:text-zinc-400 mb-8 text-center max-w-md text-lg">
                        Have you used Synthetica? We'd love to hear how it's changed your creative workflow.
                    </p>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="group relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-xl transition-all hover:scale-110 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
                        aria-label="Add Story"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-10 w-10 transition-transform group-hover:rotate-90"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                        </svg>
                    </button>
                    <span className="mt-4 text-sm font-medium text-zinc-500 dark:text-zinc-400">
                        Tap + to share
                    </span>
                </div>
            )}

            {/* Tab: Story of Everyone */}
            {activeTab === "AllStories" && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                    {posts.map((post) => {
                        const isExpanded = expandedPostIds.has(post.id);
                        return (
                            <div
                                key={post.id}
                                className="mb-4 overflow-hidden rounded-lg bg-white shadow-sm transition-all border border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800"
                            >
                                <button
                                    onClick={() => togglePost(post.id)}
                                    className="w-full px-6 py-4 text-left hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors focus:outline-none"
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                                                {post.title}
                                            </h3>
                                            <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                                By {post.author} • {post.date}
                                            </p>
                                        </div>
                                        <span className={`transform transition-transform duration-200 text-zinc-400 ${isExpanded ? "rotate-180" : ""}`}>
                                            ▼
                                        </span>
                                    </div>
                                </button>

                                {isExpanded && (
                                    <div className="px-6 pb-6 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                                        <p className="text-zinc-800 dark:text-zinc-300 mb-6 leading-relaxed">
                                            {post.content}
                                        </p>

                                        <div className="bg-zinc-50 rounded-lg p-4 dark:bg-zinc-800/30">
                                            <h4 className="text-sm font-semibold text-zinc-900 dark:text-white mb-3 uppercase tracking-wide">
                                                Comments
                                            </h4>
                                            <div className="space-y-3">
                                                {post.comments.length > 0 ? (
                                                    post.comments.map((comment) => (
                                                        <div key={comment.id} className="text-sm">
                                                            <span className="font-bold text-zinc-700 dark:text-zinc-300 mr-2">
                                                                {comment.user}:
                                                            </span>
                                                            <span className="text-zinc-600 dark:text-zinc-400">
                                                                {comment.text}
                                                            </span>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <p className="text-sm text-zinc-400 italic">No comments yet.</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
