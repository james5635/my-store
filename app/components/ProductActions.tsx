"use client";

import Image from "next/image";
import { useState } from "react";

interface PaymentModalProps {
  image: string;
  alt: string;
  isOpen: boolean;
  onClose: () => void;
}

function PaymentModal({ image, alt, isOpen, onClose }: PaymentModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onClick={onClose}>
      <div className="relative max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white hover:text-zinc-300"
        >
          <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <Image
          src={image}
          alt={alt}
          width={800}
          height={600}
          className="rounded-xl"
        />
      </div>
    </div>
  );
}

export default function ProductActions() {
  const [modalImage, setModalImage] = useState<string | null>(null);

  return (
    <>
      <div className="mt-6 flex flex-col gap-3">
        <button
          onClick={() => setModalImage("/aba.JPG")}
          className="flex items-center justify-center gap-3 rounded-xl bg-blue-600 px-6 py-4 text-lg font-semibold text-white transition-colors hover:bg-blue-700"
        >
          <Image src="/aba.JPG" alt="ABA" width={24} height={24} className="rounded" />
          Pay with ABA
        </button>
        <button
          onClick={() => setModalImage("/buy-me-a-coffee.png")}
          className="flex items-center justify-center gap-3 rounded-xl bg-yellow-500 px-6 py-4 text-lg font-semibold text-white transition-colors hover:bg-yellow-600"
        >
          <Image src="/buy-me-a-coffee.png" alt="Buy Me a Coffee" width={24} height={24} className="rounded" />
          Pay with Buy Me a Coffee
        </button>
        <a
          href="/contact"
          className="flex items-center justify-center gap-3 rounded-xl border border-zinc-300 px-6 py-4 text-center text-lg font-semibold text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
        >
          Contact Us
        </a>
      </div>

      <PaymentModal
        image={modalImage || ""}
        alt="Payment QR Code"
        isOpen={modalImage !== null}
        onClose={() => setModalImage(null)}
      />
    </>
  );
}
