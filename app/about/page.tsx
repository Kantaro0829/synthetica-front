export default function AboutPage() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black p-4">
            <main className="flex max-w-4xl flex-col items-center gap-8 text-center">
                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                    About Synthetica
                </h1>
                <p className="text-lg text-zinc-600 dark:text-zinc-400">
                    We are a collective of dreamers, engineers, and AI enthusiasts dedicated to building the most advanced
                    digital experiences. Our mission is to democratize access to powerful generative technologies.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                        <h3 className="font-bold text-blue-700 dark:text-blue-300">Innovation</h3>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">Pushing boundaries every day.</p>
                    </div>
                    <div className="p-6 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                        <h3 className="font-bold text-purple-700 dark:text-purple-300">Integrity</h3>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">Transparent and ethical AI.</p>
                    </div>
                    <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-xl">
                        <h3 className="font-bold text-green-700 dark:text-green-300">Community</h3>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">Built for and by the people.</p>
                    </div>
                </div>
            </main>
        </div>
    );
}

