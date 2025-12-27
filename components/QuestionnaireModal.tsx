"use client";

import { useState } from "react";

interface QuestionnaireModalProps {
    onClose: () => void;
    onSuccess: () => void;
}

export default function QuestionnaireModal({ onClose, onSuccess }: QuestionnaireModalProps) {
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async () => {
        if (selectedOption === null) return;

        setIsSubmitting(true);
        setError(null);

        try {
            const response = await fetch("http://localhost:8080/questionnaire", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ answer: selectedOption }),
                // Credentials include to send/receive cookies (user_id)
                credentials: "include",
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || "Failed to submit answer");
            }

            onSuccess();
            onClose();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="w-full max-w-lg bg-white dark:bg-zinc-900 rounded-xl shadow-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800">
                <div className="p-6">
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">
                        A Quick Question
                    </h3>
                    <p className="text-zinc-600 dark:text-zinc-400 mb-6">
                        To help us understand our community better, please select the statement that best describes you:
                    </p>

                    <div className="space-y-3">
                        <label className={`flex items-center p-4 rounded-lg border cursor-pointer transition-all ${selectedOption === 1 ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" : "border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800"}`}>
                            <input
                                type="radio"
                                name="questionnaire"
                                value={1}
                                checked={selectedOption === 1}
                                onChange={() => setSelectedOption(1)}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-zinc-300"
                            />
                            <span className="ml-3 font-medium text-zinc-900 dark:text-white">
                                I identify as an Antinatalist.
                            </span>
                        </label>

                        <label className={`flex items-center p-4 rounded-lg border cursor-pointer transition-all ${selectedOption === 2 ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" : "border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800"}`}>
                            <input
                                type="radio"
                                name="questionnaire"
                                value={2}
                                checked={selectedOption === 2}
                                onChange={() => setSelectedOption(2)}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-zinc-300"
                            />
                            <span className="ml-3 font-medium text-zinc-900 dark:text-white">
                                I am child-free / do not plan to have children.
                            </span>
                        </label>

                        <label className={`flex items-center p-4 rounded-lg border cursor-pointer transition-all ${selectedOption === 3 ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" : "border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800"}`}>
                            <input
                                type="radio"
                                name="questionnaire"
                                value={3}
                                checked={selectedOption === 3}
                                onChange={() => setSelectedOption(3)}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-zinc-300"
                            />
                            <span className="ml-3 font-medium text-zinc-900 dark:text-white">
                                I am planning to have children / already have children.
                            </span>
                        </label>
                    </div>

                    {error && (
                        <p className="mt-4 text-sm text-red-600 dark:text-red-400">
                            {error}
                        </p>
                    )}
                </div>

                <div className="bg-zinc-50 dark:bg-zinc-800/50 px-6 py-4 flex justify-end space-x-3">
                    {/* User didn't ask for Cancel, but usually modals have it. Can keep it or remove. 
                        Prompt says "if click send button ... store", doesn't mention cancel explicitly but implies modal behavior.
                    */}
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg transition-colors"
                        disabled={isSubmitting}
                    >
                        Skip
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={selectedOption === null || isSubmitting}
                    >
                        {isSubmitting ? "Sending..." : "Send"}
                    </button>
                </div>
            </div>
        </div>
    );
}
