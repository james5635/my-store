import Image from "next/image";
import Link from "next/link";
import { Product, formatPrice } from "../lib/products";

const PLACEHOLDER_COLORS = [
  { from: "from-rose-100", to: "to-rose-200", text: "text-rose-400" },
  { from: "from-violet-100", to: "to-violet-200", text: "text-violet-400" },
  { from: "from-sky-100", to: "to-sky-200", text: "text-sky-500" },
  { from: "from-emerald-100", to: "to-emerald-200", text: "text-emerald-500" },
  { from: "from-amber-100", to: "to-amber-200", text: "text-amber-500" },
  { from: "from-fuchsia-100", to: "to-fuchsia-200", text: "text-fuchsia-400" },
  { from: "from-cyan-100", to: "to-cyan-200", text: "text-cyan-500" },
  { from: "from-indigo-100", to: "to-indigo-200", text: "text-indigo-400" },
];

function getColorForName(name: string) {
  const hash = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return PLACEHOLDER_COLORS[hash % PLACEHOLDER_COLORS.length];
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const hasImage = product.image && product.image !== "/images/placeholder.svg";
  const color = getColorForName(product.name);

  return (
    <Link href={`/products/${product.slug}`} className="group">
      <div className="flex flex-col overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-300 hover:shadow-lg dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 h-full">
        <div className="relative aspect-square overflow-hidden bg-zinc-100 dark:bg-zinc-800">
          {hasImage ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain"
            />
          ) : (
            <div className={`flex h-full items-center justify-center bg-gradient-to-br ${color.from} ${color.to}`}>
              <span className={`text-6xl font-bold ${color.text}`}>
                {product.name.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
          {!product.inStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <span className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col p-5">
          <h3 className="text-lg font-semibold text-zinc-900 transition-colors group-hover:text-zinc-600 dark:text-zinc-50 dark:group-hover:text-zinc-300">
            {product.name}
          </h3>
          <p className="mt-2 flex-1 text-sm text-zinc-600 dark:text-zinc-400">
            {product.content.replace(/[#*_`\[\]]/g, '').slice(0, 100)}...
          </p>

          <div className="mt-4">
            <span className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
              {formatPrice(product.price)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
