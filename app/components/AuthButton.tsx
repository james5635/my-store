"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

const AVATAR_COLORS = [
  { from: "from-rose-500", to: "to-rose-600", text: "text-white" },
  { from: "from-orange-500", to: "to-orange-600", text: "text-white" },
  { from: "from-amber-500", to: "to-amber-600", text: "text-white" },
  { from: "from-green-500", to: "to-green-600", text: "text-white" },
  { from: "from-teal-500", to: "to-teal-600", text: "text-white" },
  { from: "from-cyan-500", to: "to-cyan-600", text: "text-white" },
  { from: "from-blue-500", to: "to-blue-600", text: "text-white" },
  { from: "from-red-500", to: "to-red-600", text: "text-white" },
  { from: "from-pink-500", to: "to-pink-600", text: "text-white" },
  { from: "from-indigo-500", to: "to-indigo-600", text: "text-white" },
  { from: "from-yellow-500", to: "to-yellow-600", text: "text-white" },
  { from: "from-lime-500", to: "to-lime-600", text: "text-white" },
];

function getColorForUser(name?: string | null, email?: string | null): typeof AVATAR_COLORS[0] {
  const str = name || email || "user";
  const hash = str.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return AVATAR_COLORS[hash % AVATAR_COLORS.length];
}

export default function AuthButton() {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (status === "loading") {
    return (
      <div className="h-10 w-10 animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-700" />
    );
  }

  if (session) {
    const avatarColor = getColorForUser(session.user?.name, session.user?.email);

    return (
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center rounded-full transition-shadow hover:shadow-md"
        >
          {session.user?.image ? (
            <Image
              src={session.user.image}
              alt={session.user.name || "User"}
              width={40}
              height={40}
              className="rounded-full border-2 border-white dark:border-zinc-800"
            />
          ) : (
            <div className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${avatarColor.from} ${avatarColor.to} ${avatarColor.text} font-semibold border-2 border-white dark:border-zinc-800`}>
              {session.user?.name?.charAt(0).toUpperCase() || "U"}
            </div>
          )}
        </button>

        {isOpen && (
          <div className="absolute right-0 top-full mt-2 w-64 rounded-xl border border-zinc-200 bg-white shadow-lg dark:border-zinc-700 dark:bg-zinc-900 overflow-hidden z-50">
            <div className="border-b border-zinc-200 p-4 dark:border-zinc-700">
              <p className="font-semibold text-zinc-900 dark:text-zinc-50">{session.user?.name}</p>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">{session.user?.email}</p>
            </div>
            <div className="p-2">
              <button
                onClick={() => signOut()}
                className="w-full rounded-lg px-4 py-2 text-left text-sm text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800 transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      href="/auth/signin"
      className="flex items-center gap-2 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
    >
      Sign In
    </Link>
  );
}
