import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import Header from "../../components/Header";
import { getProductBySlug, getAllProducts, formatPrice } from "../../lib/products";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const products = getAllProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  return {
    title: `${product.name} | My Store`,
    description: product.content.slice(0, 160),
  };
}

function getPlaceholderColor(name: string) {
  const colors = [
    { from: "from-rose-100", to: "to-rose-200", text: "text-rose-400" },
    { from: "from-violet-100", to: "to-violet-200", text: "text-violet-400" },
    { from: "from-sky-100", to: "to-sky-200", text: "text-sky-500" },
    { from: "from-emerald-100", to: "to-emerald-200", text: "text-emerald-500" },
    { from: "from-amber-100", to: "to-amber-200", text: "text-amber-500" },
    { from: "from-fuchsia-100", to: "to-fuchsia-200", text: "text-fuchsia-400" },
    { from: "from-cyan-100", to: "to-cyan-200", text: "text-cyan-500" },
    { from: "from-indigo-100", to: "to-indigo-200", text: "text-indigo-400" },
  ];
  const hash = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[hash % colors.length];
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  
  let product: ReturnType<typeof getProductBySlug>;
  
  try {
    product = getProductBySlug(slug);
  } catch {
    notFound();
    return null;
  }

  const color = getPlaceholderColor(product.name);
  const hasImage = product.image && product.image !== "/images/placeholder.svg";

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
          >
            &larr; Back to Products
          </Link>
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-800">
            {hasImage ? (
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className={`flex h-full items-center justify-center bg-gradient-to-br ${color.from} ${color.to}`}>
                <span className={`text-8xl font-bold ${color.text}`}>
                  {product.name.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            {!product.inStock && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <span className="rounded-full bg-zinc-900 px-6 py-3 text-lg font-medium text-white">
                  Out of Stock
                </span>
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
              {product.name}
            </h1>

            <p className="mt-4 text-3xl font-bold text-zinc-900 dark:text-zinc-50">
              {formatPrice(product.price)}
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href={`mailto:your-email@example.com?subject=${encodeURIComponent(`Inquiry about ${product.name}`)}&body=${encodeURIComponent(`Hi, I'm interested in your product: ${product.name}\n\nPrice: ${formatPrice(product.price)}\n\nI'd like to know more about:`)}`}
                className="flex-1 rounded-xl bg-zinc-900 px-6 py-4 text-center text-lg font-semibold text-white transition-colors hover:bg-zinc-700 disabled:cursor-not-allowed disabled:bg-zinc-400 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
              >
                {product.inStock ? "Get a Quote" : "Currently Unavailable"}
              </a>
              <a
                href="mailto:your-email@example.com"
                className="flex-1 rounded-xl border border-zinc-300 px-6 py-4 text-center text-lg font-semibold text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <div className="markdown-content">
            <ReactMarkdown>{product.content}</ReactMarkdown>
          </div>
        </div>
      </main>
    </div>
  );
}
