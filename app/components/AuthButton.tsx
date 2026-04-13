"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function AuthButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="h-10 w-10 animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-700" />
    );
  }

  if (session) {
    return (
      <div className="flex items-center gap-3">
        {session.user?.image ? (
          <Image
            src={session.user.image}
            alt={session.user.name || "User"}
            width={36}
            height={36}
            className="rounded-full"
          />
        ) : (
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-900">
            {session.user?.name?.charAt(0).toUpperCase() || "U"}
          </div>
        )}
        <button
          onClick={() => signOut()}
          className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          Sign Out
        </button>
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
