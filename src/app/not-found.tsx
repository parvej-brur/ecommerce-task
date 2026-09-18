import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center gap-4 px-6 py-32 text-center">
      <span className="text-5xl font-extrabold tracking-tight text-brand">404</span>
      <h1 className="text-2xl font-bold text-brand-dark">Page not found</h1>
      <p className="text-sm text-zinc-500">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
      <Link
        href="/"
        className="mt-2 inline-flex items-center rounded-lg bg-brand px-6 py-3 text-sm font-bold text-white hover:bg-brand-hover"
      >
        Back to home
      </Link>
    </main>
  );
}
