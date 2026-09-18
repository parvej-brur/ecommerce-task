import type { SORT_OPTIONS } from "../schemas/product-filters.schema";

export interface ListingCrumb {
  label: string;
  // Present only on crumbs that lead somewhere; the final crumb is the current page.
  href?: string;
}

interface ListingCrumbFilters {
  search: string;
  category: string;
  sort: (typeof SORT_OPTIONS)[number] | null;
}

// Sorts that the nav exposes as named pages ("New Arrivals", "Best Sellers").
const SORT_CRUMBS: Partial<
  Record<(typeof SORT_OPTIONS)[number], ListingCrumb>
> = {
  newest: { label: "New Arrivals", href: "/shop?sort=newest" },
  "rating-desc": { label: "Best Sellers", href: "/shop?sort=rating-desc" },
};

/** Trail shown after "Home" — the last entry doubles as the page heading. */
export function buildListingCrumbs({
  search,
  category,
  sort,
}: ListingCrumbFilters): ListingCrumb[] {
  if (search) return [{ label: `Search results for "${search}"` }];

  const sortCrumb = sort ? SORT_CRUMBS[sort] : undefined;
  const crumbs: ListingCrumb[] = [];
  if (sortCrumb) crumbs.push(sortCrumb);
  if (category) crumbs.push({ label: category });
  if (crumbs.length === 0) crumbs.push({ label: "All Products" });

  // Only crumbs that have a successor stay clickable.
  return crumbs.map((crumb, index) =>
    index === crumbs.length - 1 ? { label: crumb.label } : crumb,
  );
}
