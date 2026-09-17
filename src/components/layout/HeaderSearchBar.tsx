"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "@/hooks/useDebounce";
import { PRODUCT_CATEGORIES } from "@/lib/constants/product-categories";

const SEARCH_DEBOUNCE_MS = 400;

export function HeaderSearchBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const onShop = pathname === "/shop";

  const [query, setQuery] = useState(() => (onShop ? (searchParams.get("search") ?? "") : ""));
  const [category, setCategory] = useState(() => (onShop ? (searchParams.get("category") ?? "all") : "all"));
  const debouncedQuery = useDebounce(query, SEARCH_DEBOUNCE_MS);

  function buildShopUrl() {
    const params = new URLSearchParams(onShop ? searchParams.toString() : "");
    if (debouncedQuery.trim()) params.set("search", debouncedQuery.trim());
    else params.delete("search");
    if (category !== "all") params.set("category", category);
    else params.delete("category");
    params.delete("page");
    return `/shop${params.size ? `?${params.toString()}` : ""}`;
  }

  // Live-refine results while already on the shop page; elsewhere, only navigate on submit.
  useEffect(() => {
    if (!onShop) return;
    const currentSearch = searchParams.get("search") ?? "";
    if (debouncedQuery === currentSearch) return;
    router.replace(buildShopUrl());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery]);

  function submitSearch() {
    router.push(buildShopUrl());
  }

  return (
    <div className="mx-auto hidden max-w-xl flex-1 overflow-hidden rounded-lg border-2 border-brand md:flex">
      <select
        value={category}
        onChange={(event) => setCategory(event.target.value)}
        className="min-w-32.5 cursor-pointer border-r border-border bg-brand-light px-3 py-2.5 font-sans text-xs font-semibold text-brand-dark"
      >
        <option value="all">All Categories</option>
        {PRODUCT_CATEGORIES.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Search products, brands, categories..."
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        onKeyDown={(event) => event.key === "Enter" && submitSearch()}
        className="min-w-0 flex-1 px-4 py-2.5 font-sans text-sm text-brand-dark placeholder:text-zinc-400 focus:outline-none"
      />
      <button
        type="button"
        onClick={submitSearch}
        aria-label="Search"
        className="flex items-center px-4 bg-brand hover:bg-brand-hover"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </button>
    </div>
  );
}
