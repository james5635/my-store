import Link from "next/link";
import Header from "../../components/Header";

export default function Verify() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <Header />

      <main className="mx-auto flex max-w-md flex-col items-center px-4 py-16">
        <div className="rounded-xl border border-zinc-200 bg-white p-8 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
            <svg className="h-8 w-8 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="mt-4 text-xl font-bold text-zinc-900 dark:text-zinc-50">
            Email Sent!
          </h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Check your email and click the magic link to sign in.
          </p>
        </div>

        <Link
          href="/auth/signin"
          className="mt-8 text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
        >
          &larr; Try again
        </Link>
      </main>
    </div>
  );
}
