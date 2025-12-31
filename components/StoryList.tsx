"use client";

import { useState, useEffect } from "react";

interface Comment {
    id: number;
    user: { name: string };
    text: string;
}

interface Like {
    user_id: number;
}

interface Post {
    id: number;
    title: string;
    content: string;
    author: string;
    date: string;
    comments: Comment[];
    likes: Like[];
    liked: boolean; // From API
}



type Tab = "YourStory" | "AllStories";

export default function StoryList() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [expandedPostIds, setExpandedPostIds] = useState<Set<number>>(new Set());
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newTitle, setNewTitle] = useState("");
    const [newContent, setNewContent] = useState("");
    const [activeTab, setActiveTab] = useState<Tab>("AllStories");


    useEffect(() => {
        const fetchStories = async () => {
            try {
                const response = await fetch("http://localhost:8080/stories", {
                    credentials: "include",
                });
                if (response.ok) {
                    const data = await response.json();
                    const mappedPosts = data.map((story: { id: number; title: string; detail: string; user: { name: string }; created_at: string; comments: Comment[]; likes: Like[]; liked: boolean }) => ({
                        id: story.id,
                        title: story.title,
                        content: story.detail,
                        author: story.user?.name || "Unknown",
                        date: new Date(story.created_at).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
                        comments: story.comments || [],
                        likes: story.likes || [],
                        liked: story.liked || false,
                    }));
                    setPosts(mappedPosts);
                }
            } catch (error) {
                console.error("Failed to fetch stories:", error);
            }
        };

        fetchStories();
    }, []);

    const togglePost = (id: number) => {
        const newExpanded = new Set(expandedPostIds);
        if (newExpanded.has(id)) {
            newExpanded.delete(id);
        } else {
            newExpanded.add(id);
        }
        setExpandedPostIds(newExpanded);
    };

    const handleLike = async (postId: number, e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent toggling post expansion

        // Optimistic update
        setPosts(posts.map(post => {
            if (post.id === postId) {
                return {
                    ...post,
                    liked: true,
                    likes: [...post.likes, { user_id: 0 }] // Placeholder ID for count
                };
            }
            return post;
        }));

        try {
            const response = await fetch(`http://localhost:8080/stories/${postId}/like`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({}),
            });

            if (!response.ok) {
                if (response.status === 401) {
                    alert("Please login to like stories.");
                    // Revert optimistic update
                    setPosts(posts.map(post => {
                        if (post.id === postId) {
                            return {
                                ...post,
                                liked: false,
                                likes: post.likes.filter(l => l.user_id !== 0)
                            };
                        }
                        return post;
                    }));
                    return;
                }
                const err = await response.json();
                console.error("Failed to like story:", err);

                // Revert optimistic update on error
                setPosts(posts.map(post => {
                    if (post.id === postId) {
                        return {
                            ...post,
                            liked: false,
                            likes: post.likes.filter(l => l.user_id !== 0)
                        };
                    }
                    return post;
                }));
                return;
            }

            // Success - state already updated optimistically
        } catch (error) {
            console.error("Error liking story:", error);
            // Revert optimistic update
            setPosts(posts.map(post => {
                if (post.id === postId) {
                    return {
                        ...post,
                        liked: false,
                        likes: post.likes.filter(l => l.user_id !== 0)
                    };
                }
                return post;
            }));
        }
    };

    const handlePost = async () => {
        if (!newTitle.trim() || !newContent.trim()) return;

        try {
            const response = await fetch("http://localhost:8080/stories", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: newTitle,
                    detail: newContent,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to post story");
            }

            const data = await response.json();

            const newPost: Post = {
                id: data.id,
                title: data.title,
                content: data.detail,
                author: "You", // Default author from response if available, or static
                date: new Date(data.created_at).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
                comments: [],
                likes: [],
                liked: false
            };

            setPosts([newPost, ...posts]);
            setNewTitle("");
            setNewContent("");
            setIsModalOpen(false);
            setActiveTab("AllStories"); // Switch to list view
        } catch (error) {
            console.error("Error posting story:", error);
            alert("Failed to post story. Please try again.");
        }
    };

    const handleCancel = () => {
        setNewTitle("");
        setNewContent("");
        setIsModalOpen(false);
    };

    return (
        <div className="w-full max-w-2xl space-y-4">
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
                        Have you used Synthetica? We&apos;d love to hear how it&apos;s changed your creative workflow.
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
                        const isLikedByMe = post.liked;

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
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                                                {post.title}
                                            </h3>
                                            <div className="flex items-center space-x-4 mt-2">
                                                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                                    By {post.author} • {post.date}
                                                </p>
                                                {/* Social Counts */}
                                                <div className="flex items-center space-x-3 text-sm text-zinc-500 dark:text-zinc-400">
                                                    <div
                                                        className={`flex items-center space-x-1 ${!isLikedByMe ? "cursor-pointer hover:text-pink-600" : "cursor-default drop-shadow-sm"}`}
                                                        onClick={(e) => !isLikedByMe && handleLike(post.id, e)}
                                                    >
                                                        {isLikedByMe ? (
                                                            /* Filled Heart */
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-pink-500" viewBox="0 0 20 20" fill="currentColor">
                                                                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                                            </svg>
                                                        ) : (
                                                            /* Outline Heart */
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                                            </svg>
                                                        )}
                                                        <span>{post.likes.length}</span>
                                                    </div>
                                                    <div className="flex items-center space-x-1">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                                        </svg>
                                                        <span>{post.comments.length}</span>
                                                    </div>
                                                </div>
                                            </div>
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
                                                                {comment.user.name || "User"}:
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
