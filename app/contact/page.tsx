import Link from "next/link";
import Header from "../components/Header";
import PaymentButtons from "../components/PaymentButtons";

export default function Contact() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <Header />

      <main className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
          >
            &larr; Back to Products
          </Link>
        </div>

        <div className="rounded-2xl bg-white p-8 shadow-sm dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-purple-600">
              <span className="text-4xl font-bold text-white">SC</span>
            </div>
            <h1 className="mt-4 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
              Sou Chanrojame
            </h1>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              Product Owner
            </p>
          </div>

          <div className="mt-8 space-y-4">
            <a
              href="mailto:souchanrojame168@gmail.com"
              className="flex items-center gap-4 rounded-xl border border-zinc-200 p-4 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
                <svg className="h-5 w-5 text-zinc-600 dark:text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">Email</p>
                <p className="font-medium text-zinc-900 dark:text-zinc-50">souchanrojame168@gmail.com</p>
              </div>
            </a>

            <a
              href="tel:086468305"
              className="flex items-center gap-4 rounded-xl border border-zinc-200 p-4 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
                <svg className="h-5 w-5 text-zinc-600 dark:text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">Phone</p>
                <p className="font-medium text-zinc-900 dark:text-zinc-50">086 468 305</p>
              </div>
            </a>

            <a
              href="https://facebook.com/souchanrojame"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 rounded-xl border border-zinc-200 p-4 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
                <svg className="h-5 w-5 text-zinc-600 dark:text-zinc-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </div>
              <div>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">Facebook</p>
                <p className="font-medium text-zinc-900 dark:text-zinc-50">Sou Chanrojame</p>
              </div>
            </a>
          </div>

          <div className="mt-8">
            <p className="mb-4 text-center text-sm font-medium text-zinc-500 dark:text-zinc-400">
              Payment Methods
            </p>
            <PaymentButtons />
          </div>
        </div>
      </main>
    </div>
  );
}
