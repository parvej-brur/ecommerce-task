"use client";

import Link from "next/link";
import { useToast } from "@/providers/ToastProvider";
import { PaymentLogo, type PaymentBrand } from "@/components/ui/PaymentLogo";

const EXTERNAL_PROFILE_URL = "https://parvej.is-a.dev/";
const EXTERNAL_GITHUB_URL = "https://github.com/parvej-brur/";
const CONTACT_PHONE_DISPLAY = "+880 1677-905085";
const CONTACT_PHONE_HREF = "tel:+8801677905085";
const COMING_SOON_MESSAGE = "Coming soon...";

type FooterLink =
  | { label: string; href: string }
  | { label: string; href: string; external: true }
  | { label: string; comingSoon: true };

const SHOP_LINKS: FooterLink[] = [
  { label: "All Products", href: "/shop" },
  { label: "New Arrivals", href: "/shop?sort=newest" },
  { label: "Deals", href: "/#flash-sale" },
  { label: "Collections", href: "/shop" },
];

const CUSTOMER_SERVICE_LINKS: FooterLink[] = [
  { label: "Track Order", comingSoon: true },
  { label: "Return & Refund", comingSoon: true },
  { label: "Shipping Policy", comingSoon: true },
  { label: "FAQ", comingSoon: true },
];

const INFORMATION_LINKS: FooterLink[] = [
  { label: "About Us", href: EXTERNAL_GITHUB_URL, external: true },
  { label: "Privacy Policy", comingSoon: true },
  { label: "Terms & Conditions", comingSoon: true },
  { label: "Contact Us", href: EXTERNAL_PROFILE_URL, external: true },
];

const FOOTER_COLUMNS: { title: string; links: FooterLink[] }[] = [
  { title: "Shop", links: SHOP_LINKS },
  { title: "Customer Service", links: CUSTOMER_SERVICE_LINKS },
  { title: "Information", links: INFORMATION_LINKS },
];

const PAYMENT_METHODS: PaymentBrand[] = [
  "visa",
  "mastercard",
  "paypal",
  "bkash",
  "nagad",
  "upay",
];

function FooterColumnLink({ link }: { link: FooterLink }) {
  const { showToast } = useToast();

  if ("comingSoon" in link) {
    return (
      <button
        type="button"
        onClick={() => showToast("info", COMING_SOON_MESSAGE)}
        className="text-left hover:text-white"
      >
        {link.label}
      </button>
    );
  }

  if ("external" in link) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-white"
      >
        {link.label}
      </a>
    );
  }

  return (
    <Link href={link.href} className="hover:text-white">
      {link.label}
    </Link>
  );
}

export function Footer() {
  return (
    <footer className="bg-brand-dark font-sans text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 py-12 sm:grid-cols-[2fr_1fr_1fr_1fr_1fr]">
        <div>
          <div className="mb-4 flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            </div>
            <span className="text-xl font-extrabold tracking-tight">
              Sikdar Bazar
            </span>
          </div>
          <p className="max-w-70 text-[13px] leading-relaxed text-white/50">
            Your one-stop destination for quality products at the best prices.
            Shop more, save more.
          </p>
        </div>

        {FOOTER_COLUMNS.map((column) => (
          <div key={column.title}>
            <div className="mb-3.5 text-[13px] font-bold text-white/80">
              {column.title}
            </div>
            <div className="flex flex-col gap-2 text-[13px] text-white/50">
              {column.links.map((link) => (
                <FooterColumnLink key={link.label} link={link} />
              ))}
            </div>
          </div>
        ))}

        <div>
          <div className="mb-3.5 text-[13px] font-bold text-white/80">
            Contact
          </div>
          <div className="flex flex-col gap-2 text-[13px] text-white/50">
            <a
              href="mailto:parvejsikdar.42@gmail.com"
              className="hover:text-white"
            >
              parvejsikdar.42@gmail.com
            </a>
            <a href={CONTACT_PHONE_HREF} className="hover:text-white">
              {CONTACT_PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 border-t border-white/10 px-6 py-4">
        <span className="text-xs text-white/35">
          © {new Date().getFullYear()} Sikdar Bazar. All Rights Reserved.
        </span>
        <div className="flex flex-wrap items-center gap-2">
          {PAYMENT_METHODS.map((brand) => (
            <span
              key={brand}
              className="flex h-7 items-center rounded bg-white px-2"
            >
              <PaymentLogo brand={brand} size="sm" />
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
