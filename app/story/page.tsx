import StoryList from "@/components/StoryList";

export default function StoryPage() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black p-4">
            <main className="flex max-w-4xl flex-col items-center gap-8 text-center">
                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                    Shared Perspectives
                </h1>
                <p className="text-lg text-zinc-600 dark:text-zinc-400">
                    Every voice matters in our shared journey. We encourage you to contribute your reflections and help us evolve our community’s perspective into something even more profound. By giving words to your experiences, you help us build a more comprehensive and articulate foundation for the antinatalist philosophy.
                </p>
                <div className="p-6 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800">
                    <p className="italic text-zinc-500">"Real stories and thoughts from those who question the ethics of procreation. You are not alone."</p>
                </div>

                <div className="w-full mt-12 border-t border-zinc-200 dark:border-zinc-800 pt-12 flex justify-center">
                    <StoryList />
                </div>
            </main>
        </div>
    );
}

