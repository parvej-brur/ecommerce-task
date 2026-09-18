import { Check, RotateCcw, Shield, Truck } from "lucide-react";

const ANNOUNCEMENTS = [
  { label: "Free Delivery on Orders over ৳50", icon: Truck },
  { label: "30 Days Easy Return", icon: RotateCcw },
  { label: "100% Secure Payment", icon: Shield },
  { label: "Genuine Products", icon: Check },
];

export function AnnouncementBar() {
  return (
    <div className="hidden bg-brand-dark md:block">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-8 px-6 py-2 text-xs font-medium tracking-wide text-white">
        {ANNOUNCEMENTS.map((item) => (
          <span key={item.label} className="flex items-center gap-1.5">
            <item.icon className="size-3.5 text-[#4ade80]" strokeWidth={2} />
            {item.label}
          </span>
        ))}
      </div>
    </div>
  );
}
