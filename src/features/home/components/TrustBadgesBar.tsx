import { Headphones, RotateCcw, Shield, Truck } from "lucide-react";

const BADGES = [
  { title: "Free Delivery", subtitle: "On orders over ৳50", icon: Truck },
  { title: "30 Days Return", subtitle: "Hassle-free return policy", icon: RotateCcw },
  { title: "Secure Payment", subtitle: "100% secure checkout", icon: Shield },
  { title: "24/7 Support", subtitle: "We're here to help", icon: Headphones },
];

export function TrustBadgesBar() {
  return (
    <div className="border-y border-border bg-white py-7">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 sm:grid-cols-2 lg:grid-cols-4">
        {BADGES.map((badge) => (
          <div key={badge.title} className="flex items-center gap-3.5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-light">
              <badge.icon className="size-6 text-[#1b6d44]" strokeWidth={1.8} />
            </div>
            <div>
              <div className="text-sm font-bold text-brand-dark">{badge.title}</div>
              <div className="text-[11px] text-zinc-500">{badge.subtitle}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
