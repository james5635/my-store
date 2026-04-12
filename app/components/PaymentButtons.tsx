"use client";

import Image from "next/image";
import { useState } from "react";

export default function PaymentButtons() {
  const [modalImage, setModalImage] = useState<string | null>(null);

  return (
    <>
      <div className="flex gap-4">
        <button
          onClick={() => setModalImage("/aba.JPG")}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-blue-50 p-4 transition-colors hover:bg-blue-100 dark:border-zinc-800 dark:bg-blue-900/20 dark:hover:bg-blue-900/30"
        >
          <Image src="/aba.JPG" alt="ABA" width={32} height={32} className="rounded" />
          <span className="font-medium text-blue-700 dark:text-blue-400">ABA Pay</span>
        </button>
        <button
          onClick={() => setModalImage("/buy-me-a-coffee.png")}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-yellow-50 p-4 transition-colors hover:bg-yellow-100 dark:border-zinc-800 dark:bg-yellow-900/20 dark:hover:bg-yellow-900/30"
        >
          <Image src="/buy-me-a-coffee.png" alt="Buy Me a Coffee" width={32} height={32} className="rounded" />
          <span className="font-medium text-yellow-700 dark:text-yellow-400">Buy Me a Coffee</span>
        </button>
      </div>

      {modalImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setModalImage(null)}
        >
          <div className="relative max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setModalImage(null)}
              className="absolute -top-10 right-0 text-white hover:text-zinc-300"
            >
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <Image
              src={modalImage}
              alt="Payment QR Code"
              width={500}
              height={500}
              className="rounded-xl"
            />
          </div>
        </div>
      )}
    </>
  );
}
