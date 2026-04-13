import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { prisma } from "./prisma";

const productsDirectory = path.join(process.cwd(), "content/products");

export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  category: string;
  image: string;
  inStock: boolean;
  featured: boolean;
  content: string;
}

export async function ensureProductInDb(slug: string): Promise<string> {
  const fullPath = path.join(productsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data } = matter(fileContents);

  const product = await prisma.product.upsert({
    where: { slug },
    update: {},
    create: {
      id: slug,
      slug,
      name: data.name,
      price: data.price,
      category: data.category || "General",
      image: data.image || "/images/placeholder.jpg",
      inStock: data.inStock !== false,
      featured: data.featured === true,
    },
  });

  return product.id;
}

export function getAllProducts(): Product[] {
  const fileNames = fs.readdirSync(productsDirectory);

  const products = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      return getProductBySlug(slug);
    });

  return products.sort((a, b) => a.name.localeCompare(b.name));
}

export function getProductBySlug(slug: string): Product {
  const fullPath = path.join(productsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    id: slug,
    slug,
    name: data.name,
    price: data.price,
    category: data.category || "General",
    image: data.image || "/images/placeholder.jpg",
    inStock: data.inStock !== false,
    featured: data.featured === true,
    content,
  };
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}
