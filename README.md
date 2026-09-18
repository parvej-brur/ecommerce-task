<a name="top"></a>

<div align="center">

# Sikdar Bazar

### A performance-focused e-commerce storefront: search, filter, cart, and checkout

Sikdar Bazar is a Next.js App Router storefront built over a catalog of 500+ products. It covers
the full shopping loop: browsing and filtering a large catalog with URL-based state that survives
a refresh, inspecting a product with related items and stock/rating detail, managing a persistent
cart, and completing a validated checkout form, all while keeping the client JS bundle close to
what each page actually needs.

<p>
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-000000?logo=nextdotjs&logoColor=white">
  <img alt="React" src="https://img.shields.io/badge/React-149ECA?logo=react&logoColor=white">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white">
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-38BDF8?logo=tailwindcss&logoColor=white">
  <img alt="TanStack Query" src="https://img.shields.io/badge/TanStack_Query-FF4154?logo=reactquery&logoColor=white">
  <img alt="Zustand" src="https://img.shields.io/badge/Zustand-433E38?logo=react&logoColor=white">
  <img alt="Zod" src="https://img.shields.io/badge/Zod-3E67B1?logo=zod&logoColor=white">
</p>

**[Preview](#preview)** · **[Getting started](#getting-started)** · **[Architecture](#architecture)**

</div>

---

<details>
<summary><strong>Table of contents</strong></summary>

- [Preview](#preview)
- [Overview](#overview)
- [Features](#features)
- [Tech stack](#tech-stack)
- [Getting started](#getting-started)
- [Project structure](#project-structure)
- [Architecture](#architecture)
- [API & data fetching](#api-and-data-fetching)
- [Server vs Client Components](#server-vs-client-components)
- [State management](#state-management)
- [Performance decisions](#performance-decisions)
- [SEO](#seo)
- [Loading, error & empty states](#loading-error-and-empty-states)
- [Accessibility & responsive design](#accessibility-and-responsive-design)
- [About the developer](#about-the-developer)

</details>

---

## Preview

A walkthrough of the storefront: browsing, filtering, product detail, cart, and checkout.

https://github.com/parvej-brur/e-commerce-task/raw/main/public/videos/preview.mp4

If the video above doesn't render inline, it's also available directly at
[`public/videos/preview.mp4`](public/videos/preview.mp4). No hosted deployment is attached to
this submission, so run it locally with [Getting started](#getting-started).

<p align="right"><a href="#top">Back to top</a></p>

---

## Overview

This is a take-home frontend task (product search and checkout) built as a real Next.js App
Router application rather than a single page. The catalog is a locally generated dataset of
550 products served through an internal API layer, filtered and paginated entirely through URL
search parameters, with a Zustand-backed cart that persists across sessions and a Zod-validated
checkout form.

The project follows a fixed feature-folder architecture (`src/features/<name>`) with an enforced
dependency boundary: a feature can't import another feature, and shared code only lives in
`src/lib` or `src/components`. The boundary is checked by ESLint, not left to discipline.

<p align="right"><a href="#top">Back to top</a></p>

---

## Features

| Area                                  | What it does                                                                                                                                                                |
| ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Product catalog**                   | 550 generated products across multiple categories, each with images, price, discount, stock, and rating.                                                                    |
| **Search, filters, sort, pagination** | Free-text search, category, price range, minimum rating, and four sort orders, all combinable and reflected in the URL (`/shop?search=...&category=...&sort=...&page=...`). |
| **Refresh-safe filter state**         | Filters live in the URL query string instead of component state, so a page refresh or a shared link reproduces the exact same result set.                                   |
| **Product detail**                    | Images, price/discount, stock status, rating, tags, and related products.                                                                                                   |
| **Related products**                  | Each product carries a fixed set of related product IDs, resolved server-side and rendered on the detail page.                                                              |
| **Shopping cart**                     | Add, remove, change quantity, and clear, with a slide-out drawer and a persistent badge count.                                                                              |
| **Cart persistence**                  | Cart contents survive a page refresh and browser restart via `localStorage`.                                                                                                |
| **Checkout**                          | Contact and billing form (React Hook Form + Zod), four payment methods (card, mobile merchant, cash on delivery, Bangla QR), promo codes, and an order total breakdown.      |
| **Wishlist**                          | A secondary, Zustand-backed "save for later" list with its own persisted store, toggled from the product card and detail page.                                              |
| **SEO-friendly product pages**        | Per-product `generateMetadata`, Open Graph tags, a generated sitemap covering every product, and `robots.txt`.                                                              |
| **Loading, empty, and error states**  | Route-level loading skeletons, query-level skeletons, empty-result and empty-cart states, and retryable error states throughout.                                            |

<p align="right"><a href="#top">Back to top</a></p>

---

## Tech stack

| Choice                                              | Reason it's here                                                                                                                                      |
| --------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Next.js, App Router**                             | Server Components fetch the initial data for every page; Route Handlers back the product/checkout API; `generateMetadata` drives per-product SEO.     |
| **React and TypeScript**                            | Function components and hooks throughout; the type system is the main safety net for the product/filter/cart contracts.                               |
| **Tailwind CSS, CSS-first**                         | No `tailwind.config.ts`, design tokens live in `@theme` inside `src/styles/globals.css`.                                                              |
| **TanStack Query**                                  | Client-side cache for product list/detail queries, seeded from the server via `HydrationBoundary` so the first client render doesn't refetch.         |
| **nuqs**                                            | Type-safe URL search-param state for filters, one parser set shared between the server (`createSearchParamsCache`) and the client (`useQueryStates`). |
| **Zustand, with `persist`**                         | Cart and wishlist state, persisted to `localStorage`, read through per-field selectors to avoid unnecessary re-renders.                               |
| **React Hook Form, Zod, and `@hookform/resolvers`** | The checkout form's state, validation, and submission.                                                                                                |
| **axios**                                           | The single HTTP client used by the browser-side API layer (`src/lib/api/client.ts`), wrapped so every failure becomes one `ApiRequestError` shape.    |
| **@faker-js/faker** (dev)                           | Generates the 550-product dataset once, from a fixed seed, via `scripts/generate-products.mjs`.                                                       |

<p align="right"><a href="#top">Back to top</a></p>

---

## Getting started

**Prerequisites:** Node 20+ and npm.

```bash
git clone https://github.com/parvej-brur/e-commerce-task.git
cd e-commerce-task
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command                     | Purpose                                                      |
| --------------------------- | ------------------------------------------------------------ |
| `npm run dev`               | Start the development server                                 |
| `npm run build`             | Production build                                             |
| `npm run start`             | Serve the production build                                   |
| `npm test`                  | Run the `node:test` suite under `tests/`                     |
| `npm run generate:products` | Regenerate `products.mock.json` from the seeded Faker script |

### Environment

| Variable               | Default                     | Used for                                                                       |
| ---------------------- | --------------------------- | ------------------------------------------------------------------------------ |
| `NEXT_PUBLIC_API_URL`  | `http://localhost:3000/api` | Base URL the browser-side `apiClient` (axios) calls for products and checkout. |
| `NEXT_PUBLIC_SITE_URL` | `http://localhost:3000`     | Absolute URLs in `sitemap.ts` and `robots.ts`.                                 |

Both are read through `src/config/env.ts` (Zod-validated at startup) instead of `process.env`
directly, and both are listed in `.env.example`. No secrets are involved.

<p align="right"><a href="#top">Back to top</a></p>

---

## Project structure

```
src/
├── app/                    Routing layer only — pages, layouts, Route Handlers, no business logic
│   ├── api/products/       GET list, GET [id] (+ related), GET search
│   ├── api/checkout/       POST, mock order submission
│   ├── products/[id]/      Product detail page + loading.tsx
│   ├── shop/                Product listing page + loading.tsx
│   ├── checkout/            Checkout page + loading.tsx
│   ├── wishlist/             Wishlist page
│   ├── error.tsx · global-error.tsx · not-found.tsx
│   └── sitemap.ts · robots.ts · icon.tsx · apple-icon.tsx · opengraph-image.tsx
├── features/                Business domains — the only place logic lives
│   ├── products/            api/ (server + client), components/, hooks/, schemas/, utils/, types.ts, index.ts
│   ├── cart/                 CartDrawer, CartDrawerItem, index.ts
│   ├── checkout/              api/, components/, hooks/, schemas/, utils/, index.ts
│   ├── home/                   Homepage sections (hero, flash sale, showcase, newsletter…)
│   └── wishlist/                 WishlistView, index.ts
├── components/
│   ├── ui/                  Design-system primitives (Button, Input, Select, Badge, Skeleton, QuantityStepper)
│   ├── layout/               Header, Footer, CategoryNav, MobileNavDrawer, AnnouncementBar, SiteJsonLd
│   ├── forms/                  Shared FormField wrapper
│   └── shared/                   ProductGrid/Card, Pagination, EmptyState, ErrorState, Toast, RatingStars
├── providers/                AppProviders, QueryProvider (TanStack Query client), ToastProvider
├── hooks/                     Shared hooks — useDebounce, useIsHydrated
├── store/                      cartStore.ts, wishlistStore.ts (Zustand + persist)
├── lib/
│   ├── api/                  client.ts (axios), errors.ts, response.ts, timing.ts
│   ├── utils/                  cn.ts, formatCurrency.ts, getStockStatus.ts
│   └── constants/               product-categories.ts
├── config/                    env.ts (Zod-validated environment), site.ts (site name/URL/OG defaults)
├── styles/                     globals.css (Tailwind `@theme` tokens), fonts.ts
└── types/                      api.ts (Product, FilterParams, PaginatedProducts, ApiResponse)

public/videos/     preview.mp4 (walkthrough, referenced in the Preview section)
tests/              mirrors src/ — filterProducts, sortProducts, paginateProducts, cartStore
scripts/             generate-products.mjs — seeded Faker dataset generator
```

A feature exposes a single public surface through its `index.ts`; outside code always imports
`@/features/<name>`, never a path inside it. There is exactly one path alias, `@/*` → `./src/*`.

<p align="right"><a href="#top">Back to top</a></p>

---

## Architecture

```
Faker-generated dataset (scripts/generate-products.mjs, seeded)
        │  written once to
        ▼
src/features/products/api/products.mock.json  (550 products)
        │  loaded once per server instance (module-level singleton, "server-only")
        ▼
src/features/products/api/products.loader.ts  →  products.api.ts (filter / sort / paginate)
        │                                              │
        │ called directly (no HTTP)                    │ called by Route Handlers
        ▼                                              ▼
Server Components                              src/app/api/products/**  (Route Handlers)
(HomePage, ShopPage, ProductPage)                       │
        │  seeds the TanStack Query cache                │  axios (src/lib/api/client.ts)
        │  with the SAME query key ↓                      ▼
        └──────────────►  HydrationBoundary  ◄──── products.queries.ts (client fetch functions)
                                  │
                                  ▼
                    TanStack Query cache (client)
                                  │
                                  ▼
                    Client Components (ProductListView,
                    ProductDetailView, filters, pagination)

Zustand stores (cartStore, wishlistStore), independent of the query cache,
persisted to localStorage, read by Header, CartDrawer, ProductCard, CheckoutView.
```

- **One dependency direction.** `app/` depends on `features/`; `features/` depend on shared
  layers (`components/`, `lib/`, `hooks/`, `providers/`, `store/`, `types/`, `config/`); shared
  layers never import from `features/` or `app/`; a feature never imports another feature.
- **The boundary is enforced by ESLint**, not convention. `eslint.config.mjs` reads
  `src/features/` at lint time and generates an `import/no-restricted-paths` zone per feature,
  so a new feature is covered automatically. `no-restricted-imports` also blocks deep imports
  like `@/features/products/components/ProductCard`, only `@/features/products` is allowed.
- **A feature's public surface is its `index.ts`.** Internal modules (e.g.
  `filterProducts.ts`, `paginate.ts`) are white-box implementation details, tested directly in
  `tests/` but never imported from outside the feature.
- **No cross-cutting `core/`, `services/`, `helpers/`, or `common/` folders.** There is exactly
  one helper home, `src/lib/`, and one shared-UI home, `src/components/`.
- **Checkout submits through a Route Handler**, `POST /api/checkout`, consumed via a TanStack
  Query mutation. That means the same axios client, error normalization, and loading/error state
  machinery used for product fetching also covers the checkout request, one HTTP path, not two.

<p align="right"><a href="#top">Back to top</a></p>

---

## API and data fetching

**Two layers, one dataset.** `src/features/products/api/products.loader.ts` parses
`products.mock.json` once per server instance into a module-level array and an id-keyed `Map`
(both guarded by `"server-only"` so this code can never end up in a client bundle).
`products.api.ts` builds on that loader with the actual product operations:

| Function                             | Used for                                                                                          |
| ------------------------------------ | ------------------------------------------------------------------------------------------------- |
| `getProducts(filters)`               | Listing, validates `filters` with `productFiltersSchema` (Zod), then filters → sorts → paginates. |
| `getProductById(id)`                 | Product detail, throws `NotFoundError` (404) if the id doesn't exist.                             |
| `getRelatedProducts(id, limit)`      | Resolves a product's fixed `relatedIds` to full `Product` records.                                |
| `searchProducts(query)`              | Title-first search, falling back to description/category/tags, capped at 10 results.              |
| `filterByCategory` / `filterByPrice` | Narrower helpers used by the search Route Handler.                                                |

**Two consumers of that API layer:**

1. **Server Components call it directly.** `HomePage`, `ShopPage`, and the product detail
   `ProductPage` all `await getProducts(...)` / `getProductById(...)` with no HTTP round trip.
2. **Route Handlers wrap it for the client.** `GET /api/products` (list, with `search`,
   `category`, `sort`, `page`, `limit`, `priceMin`, `priceMax`, `minRating` query params),
   `GET /api/products/[id]` (detail + related, id-format-validated), and
   `GET /api/products/search`. Every handler wraps its call in `withTiming` (dev-only console
   timing) and returns through `apiSuccess`/`apiError`, a single `{ data, success, error?,
statusCode }` envelope with a shared `Cache-Control` header.

The **browser-side API module**, `products.queries.ts`, calls those Route Handlers through the
shared `apiClient` (axios, `src/lib/api/client.ts`) and exposes a `productKeys` query-key
factory (`list(params)`, `detail(id)`) used by both the TanStack Query hooks and the
server-side cache seeding described below. No component ever builds a URL or calls
`fetch`/`axios` directly.

**Query params drive search, filters, sort, and pagination.** `nuqs` owns the URL state: one
parser set (`productSearchParamsParsers`) is shared between `productSearchParamsCache` (server,
via `createSearchParamsCache`) and `useQueryStates` (client), so `/shop?category=Electronics
&sort=price-asc&page=2` parses identically on both sides and survives a refresh because it's
never held in component state.

**Avoiding duplicate or unnecessary requests:**

- The Shop and Product pages fetch server-side and call `queryClient.setQueryData(productKeys...,
data)` before rendering `HydrationBoundary`, so the client's first `useQuery` render reads that
  seeded cache entry instead of refetching, because the query key is byte-for-byte identical to
  the one the server used.
- `React.cache()` wraps the product-detail lookup on the server (`loadProduct` in
  `src/app/products/[id]/page.tsx`), so `generateMetadata` and the page body share one lookup
  per request instead of two.
- `keepPreviousData` on the products list query keeps the previous page's data on screen
  (dimmed) while a new filter/page request is in flight, instead of dropping to a loading state
  and refetching from empty.
- Hovering a `ProductCard` calls `queryClient.prefetchQuery` for that product's detail query, so
  a click right after usually renders from cache with no loading state at all.

**Validation and error handling.** `FilterParams` are validated server-side with
`productFiltersSchema` before any filtering runs; a bad value throws `ValidationError` → HTTP 400. `getProductById` throws `NotFoundError` → HTTP 404 for a non-existent id, and
`/api/products/[id]` additionally rejects ids that don't match the generator's id format before
even looking one up. On the client, `apiClient`'s response interceptor turns every axios failure,
whether it's an HTTP error, a timeout, or a network failure, into one `ApiRequestError` with an
already human-readable message, so UI code branches on one error type instead of inspecting
raw axios/HTTP details.

**Invalid product requests** (`/products/does-not-exist`) resolve to Next's `notFound()` on the
server, rendering `not-found.tsx`, rather than shipping a broken detail page to the client.

<p align="right"><a href="#top">Back to top</a></p>

---

## Server vs Client Components

**Server Components, data fetching and layout, no interactivity of their own:**

- `RootLayout`, `HomePage`, `ShopPage`, `ProductPage` (`/products/[id]`), and `CheckoutPage`
  fetch or seed data and render a client subtree; they hold no `useState`/event handlers.
- `sitemap.ts`, `robots.ts`, `icon.tsx`, `apple-icon.tsx`, `not-found.tsx`.
- Most of the homepage's marketing sections (`HeroBanner`, `PromoBanners`, `TrustBadgesBar`,
  `CategorySidebar`, `HomeNavRow`, `ProductShowcaseSection`) carry no `"use client"` directive
  and render fully on the server, they're static composition, so they cost zero client JS.
- The entire `features/*/api`, `schemas/`, `types.ts`, and `utils/` layers are plain
  server-safe modules (several explicitly marked `"server-only"`), imported by Server
  Components with no client-bundle cost.

**Client Components, anything that needs browser state, event handlers, or a browser-only
API, 29 files across the codebase carry `"use client"`:**

- **URL/query state:** `ProductListView`, `ProductFilters` (`useQueryStates`, `useQuery`).
- **TanStack Query consumers:** `ProductListView`, `ProductDetailView` (`useQuery`/`useMutation`
  can only run client-side).
- **Zustand store consumers:** `Header`, `CartDrawer`, `CartDrawerItem`, `ProductCard`,
  `ProductDetailView`, `CheckoutView` (cart/wishlist are `localStorage`-backed browser state).
- **Forms:** `CheckoutForm`, `PaymentMethodFieldset` (`react-hook-form`'s `useForm`/`watch`).
- **Interaction/browser APIs:** `MobileNavDrawer`, `HeaderSearchBar`, `HeroBannerCarousel`,
  `FlashSaleCountdown` (timers), `CartDrawer` (`document.body.style.overflow` via `useEffect`).
- **Required by Next.js:** `error.tsx` and `global-error.tsx` must be Client Components, error
  boundaries can't be Server Components.

**Presentational components take on client-ness by where they're rendered, not by declaring
it.** `ProductGrid` and `RelatedProducts` have no `"use client"` directive themselves, but
since they're only ever imported from client parents (`ProductListView`, `ProductDetailView`),
they end up in the client bundle anyway. That's the correct outcome, since they render
`ProductCard`, which genuinely needs client interactivity (wishlist toggle, hover-prefetch).
The same components, if a future page composed them from a pure Server Component, would render
server-side with no extra JS.

<p align="right"><a href="#top">Back to top</a></p>

---

## State management

**Zustand, with the `persist` middleware**, was chosen over Redux or Context because cart state
is flat, has no cross-slice dependencies, and needs `localStorage` persistence out of the box.
`persist` covers that in a few lines instead of a custom `useEffect` sync.

- **Cart state** (`src/store/cartStore.ts`): `items: CartItem[]` plus `isOpen` for the drawer.
  `partialize` persists only `items`, the drawer's open/closed state resets on reload by
  design, it isn't meant to survive a refresh.
- **Persistence:** `persist(..., { name: "cart-storage" })` mirrors `items` to `localStorage`
  automatically on every mutation and rehydrates on load. `useIsHydrated()` (a small
  `useEffect`-based hook) gates any cart-derived UI (badge count, wishlist heart) until
  rehydration completes, avoiding a server/client markup mismatch on first paint.
- **Add / remove / update quantity:** `addItem` merges into an existing line by `productId`
  (increments quantity) or appends a new one; `updateQty` sets a quantity or removes the line
  entirely once it drops to zero or below; `removeItem` removes by id; `clearCart` empties the
  cart after a successful checkout.
- **Cart totals:** computed with `useMemo` over `items` in both `CartDrawer` (subtotal,
  item count) and `useOrderTotals` (subtotal, 8% tax, promo discount, total). A `reduce` over
  the cart is cheap at real-world cart sizes, but memoizing it means it only re-runs when
  `items` actually changes, not on every unrelated render of the component that reads it.
- **Avoiding unnecessary re-renders:** every consumer subscribes through a field selector,
  `useCartStore((state) => state.items)`, `useCartStore((state) => state.toggleCart)`, instead
  of destructuring the whole store, so e.g. `CartDrawerItem` only re-renders when the cart
  items themselves change, not when `isOpen` toggles.
- **Wishlist** (`src/store/wishlistStore.ts`) follows the identical pattern as a second,
  independent persisted store. It isn't part of the assignment's cart requirement, but it
  reuses the same state-management approach rather than introducing a second one.

<p align="right"><a href="#top">Back to top</a></p>

---

## Performance decisions

- **`useMemo` for derived, render-relevant values only:** the assembled `<ProductGrid>` element
  in `ProductListView` (recomputed only when `data` or the prefetch callback changes, so
  re-renders triggered by filter-chip state don't rebuild the whole grid tree); cart/order
  totals in `CartDrawer` and `useOrderTotals` (reduce over cart items).
- **`useCallback` where it feeds a memo dependency:** `prefetchProduct` (`ProductListView`) and
  `handleMouseEnter` (`ProductCard`) are kept referentially stable specifically because an
  unstable function reference would invalidate the `useMemo` above on every render. The two
  are used together, not added independently.
- **Server Components fetch data with no client-side request or client JS for the fetch
  itself.** `ShopPage`, `ProductPage`, and `HomePage` `await` the data layer directly.
  `HomePage` fetches "new arrivals" and "best sellers" with `Promise.all` since they're
  independent, rather than two sequential `await`s.
- **`keepPreviousData`** on the product list query avoids a loading-skeleton flash on every
  filter/page change. The previous result set stays visible (dimmed) until the new one
  arrives.
- **Hover-prefetching** product detail queries (`queryClient.prefetchQuery` on `ProductCard`
  mouse-enter) means the common "hover, then click" path renders from cache with no loading
  state on the detail page.
- **ISR on the product detail route** (`export const revalidate = 3600`). Pages are served
  from the cache and revalidated hourly instead of re-rendering per request.
- **`React.cache()`** dedupes the product lookup shared by `generateMetadata` and the page body
  on `/products/[id]`, so a single request does one data lookup, not two.
- **`HydrationBoundary` with matching query keys** eliminates the double-fetch that's easy to
  get by accident when combining Server Components with a client cache. The client's first
  render reads the server-seeded cache entry instead of firing its own request.

<p align="right"><a href="#top">Back to top</a></p>

---

## SEO

- **Root metadata:** `src/config/site.ts` is the single source of truth for the site name,
  description, URL, and locale. The root layout sets `metadataBase` (so every relative
  URL-based metadata field resolves to a full URL), a title template (`%s | Sikdar Bazar`), a
  default description, and site-wide `openGraph`/`twitter` defaults, all inherited by any route
  that doesn't override them.
- **Per-route canonical URLs:** `home`, `/shop`, and `/products/[id]` each set their own
  `alternates.canonical`. Canonical isn't auto-derived from the route, so it's declared
  explicitly per page rather than inherited, which would otherwise leave every page pointing at
  `/`.
- **Per-product metadata:** `generateMetadata` on `/products/[id]` reads the product
  server-side (through the same `React.cache()`-wrapped lookup the page body uses) and sets
  `title`, `description`, canonical URL, and Open Graph `title`/`description`/`images` (the
  actual product photo), fully rendered on the server, so crawlers see real per-product tags
  with no client JS involved.
- **Default Open Graph image:** `src/app/opengraph-image.tsx` generates a branded 1200×630
  card (via `next/og`, same pattern as `icon.tsx`/`apple-icon.tsx`) used as the fallback
  `og:image`/`twitter:image` for any route that doesn't set its own — product pages still win
  with their own photo since a route-level `openGraph.images` always takes priority over the
  file-based default.
- **Structured data (JSON-LD):** `SiteJsonLd` (root layout) emits `Organization` and `WebSite`
  schema.org data with a `SearchAction` pointing at `/shop?search=`, for brand/sitelinks-search
  eligibility. `ProductJsonLd` (product pages) emits `Product` schema with price, `BDT`
  currency, stock availability, and aggregate rating, enabling rich results (stars/price/stock)
  in search listings.
- **Non-indexable routes:** `CheckoutPage`, `WishlistPage`, and the `/login` stub set
  `robots: { index: false }` — none of them have content that's meaningful or unique to a
  crawler (checkout and wishlist are personalized/client-state pages, login is unshipped).
- **`sitemap.ts`:** generates the homepage, `/shop`, and one entry per product (550 URLs,
  `lastModified` from the product's `createdAt`), using `NEXT_PUBLIC_SITE_URL`.
- **`robots.ts`:** allows everything except `/cart`, `/checkout`, `/wishlist`, and `/api/`, and
  points to `/sitemap.xml`.
- **Rendering strategy:** because the product detail and shop pages are Server Components,
  their initial HTML already contains real product content, so there's no "blank shell + client
  fetch" gap for crawlers or for `<meta>` consumers like social-link unfurlers to fall into.

<p align="right"><a href="#top">Back to top</a></p>

---

## Loading, error and empty states

| State                        | Where                                                                                                  | How                                                                                                                                                                                                         |
| ---------------------------- | ------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Route-level loading**      | `app/loading.tsx`, `app/shop/loading.tsx`, `app/products/[id]/loading.tsx`, `app/checkout/loading.tsx` | Next's `loading.tsx` convention, shown instantly while the Server Component for that route resolves.                                                                                                        |
| **Query-level loading**      | `ProductListView`, `ProductDetailView`                                                                 | `ProductGridSkeleton` / `ProductDetailSkeleton`, shown while `useQuery` has no data yet (`isLoading && !data`), distinct from route loading, which only covers the very first server render.                |
| **Empty results**            | Product listing                                                                                        | `EmptyState` with a "Clear filters" action that resets every URL filter param at once.                                                                                                                      |
| **Empty cart**               | `CartDrawer`, `CheckoutView`                                                                           | A dedicated empty state in the drawer; `CheckoutView` redirects the checkout flow itself into an `EmptyState` with a "Continue shopping" link rather than rendering a form with nothing to submit.          |
| **Query errors (retryable)** | Product list, product detail                                                                           | `ErrorState` with a **Retry** button wired to that query's `refetch()`.                                                                                                                                     |
| **Route errors**             | Any uncaught render error                                                                              | `app/error.tsx` (route-level boundary; Next.js passes it `retry` instead of `reset`) and `app/global-error.tsx` (root-layout-level fallback).                                                               |
| **Invalid product id**       | `/products/[id]`                                                                                       | The Route Handler rejects ids that don't match the generator's id format (400); a well-formed but non-existent id resolves through `NotFoundError` → the page calls `notFound()` → `not-found.tsx` renders. |
| **API validation errors**    | Every Route Handler                                                                                    | Bad filter/query params (`productFiltersSchema`) or a bad checkout payload (`checkoutSchema`) short-circuit into a 400 through the shared `apiError()` envelope before any data work happens.               |
| **Form errors**              | `CheckoutForm`                                                                                         | Field-level Zod messages rendered inline by `react-hook-form`; a failed submission (e.g. a network error) surfaces as a toast, not a lost form.                                                             |
| **Hydration-sensitive UI**   | Cart badge, wishlist heart, checkout                                                                   | Held back behind `useIsHydrated()` until `localStorage`-derived state is available, avoiding a server/client mismatch flash instead of just hiding an error.                                                |

<p align="right"><a href="#top">Back to top</a></p>

---

## Accessibility and responsive design

- Interactive icon-only controls (cart toggle, wishlist heart, mobile nav, drawer close) carry
  `aria-label`s, and toggles like the wishlist heart also set `aria-pressed`.
- The checkout form uses real `<fieldset>`/`<legend>` grouping (with `sr-only` legends) and
  associates every input with a visible `<label>` through `FormField`; validation errors are
  rendered next to their field rather than only summarized.
- Layouts are mobile-first Tailwind (`grid-cols-2 sm:grid-cols-3 lg:grid-cols-4` product grids,
  a dedicated `MobileNavDrawer` for small screens, a responsive checkout grid that stacks the
  order summary under the form below `lg`).
- Product and category images use `next/image` with descriptive `alt` text and explicit `sizes`
  for correct responsive loading. Static assets in `public/images/` follow one consistent
  kebab-case naming convention.

This wasn't run through a full accessibility audit, these are the concrete patterns actually
in the code, not a certified compliance claim.

<p align="right"><a href="#top">Back to top</a></p>

---

## About the developer

Built by **Parvej Sikdar** as a take-home frontend submission.

- GitHub: [@parvej-brur](https://github.com/parvej-brur)
- Repository: [github.com/parvej-brur/e-commerce-task](https://github.com/parvej-brur/e-commerce-task)

<p align="right"><a href="#top">Back to top</a></p>
