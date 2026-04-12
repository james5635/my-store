import Header from "./components/Header";
import ProductCard from "./components/ProductCard";
import { getAllProducts } from "./lib/products";

export default function Home() {
  const products = getAllProducts();

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
            Welcome to My Store
          </h1>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            Browse our collection of unique products
          </p>
        </div>

        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
            All Products
          </h2>
          <span className="text-sm text-zinc-500 dark:text-zinc-400">
            {products.length} product{products.length !== 1 ? "s" : ""}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>

        {products.length === 0 && (
          <div className="rounded-xl border-2 border-dashed border-zinc-300 p-12 text-center dark:border-zinc-700">
            <p className="text-zinc-500 dark:text-zinc-400">
              No products yet. Add markdown files in{" "}
              <code className="rounded bg-zinc-100 px-1 py-0.5 dark:bg-zinc-800">
                content/products/
              </code>
            </p>
          </div>
        )}
      </main>

      <footer className="mt-16 border-t border-zinc-200 bg-white py-12 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            &copy; {new Date().getFullYear()} My Store. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
