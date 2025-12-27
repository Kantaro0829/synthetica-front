"use client";


import { useEffect, useState } from "react";

export default function Home() {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    // Simple cookie parser for "user_id"
    const match = document.cookie.match(new RegExp("(^| )user_id=([^;]+)"));
    if (match) {
      setUserId(match[2]);
    }
  }, []);

  const handleSignOut = () => {
    // Delete cookie
    document.cookie = "user_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setUserId(null);
    window.location.reload();
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full flex-col items-center justify-center gap-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-black dark:text-white">
          Synthetica
        </h1>

        {userId ? (
          <div className="flex flex-col items-center gap-4">
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              Signed in as Google User {userId}
            </p>
            <button
              onClick={handleSignOut}
              className="rounded-full bg-red-600 px-6 py-2 font-semibold text-white transition-colors hover:bg-red-700"
            >
              Sign out
            </button>
          </div>
        ) : (
          <a
            href="http://localhost:8080/auth/google/login"
            className="flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
          >
            <span>Login with Google</span>
          </a>
        )}
      </main>
    </div>
  );
}
