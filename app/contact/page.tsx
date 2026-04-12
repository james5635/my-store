import Link from "next/link";
import Header from "../components/Header";

export default function Contact() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <Header />

      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
          >
            &larr; Back to Products
          </Link>
        </div>

        <div className="rounded-2xl bg-white p-8 shadow-sm dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
            Get in Touch
          </h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Have questions about our products? Send us an email and we&apos;ll get back to you.
          </p>

          <div className="mt-8">
            <a
              href="mailto:your-email@example.com"
              className="inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-6 py-3 text-lg font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Send Email
            </a>
          </div>

          <div className="mt-12 border-t border-zinc-200 pt-8 dark:border-zinc-800">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              What happens next?
            </h2>
            <ul className="mt-4 space-y-3 text-zinc-600 dark:text-zinc-400">
              <li className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-xs font-medium dark:bg-zinc-800">1</span>
                Send us an email with the product you&apos;re interested in
              </li>
              <li className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-xs font-medium dark:bg-zinc-800">2</span>
                We&apos;ll respond with pricing and availability
              </li>
              <li className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-xs font-medium dark:bg-zinc-800">3</span>
                Complete your order via secure payment link
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
