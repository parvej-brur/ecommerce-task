const BADGES = [
  {
    title: "Free Delivery",
    subtitle: "On orders over ৳50",
    icon: (
      <>
        <rect x="1" y="3" width="15" height="13" rx="2" />
        <path d="M16 8h4l3 3v5a2 2 0 0 1-2 2h-1" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </>
    ),
  },
  {
    title: "30 Days Return",
    subtitle: "Hassle-free return policy",
    icon: (
      <>
        <polyline points="23 4 23 10 17 10" />
        <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
      </>
    ),
  },
  {
    title: "Secure Payment",
    subtitle: "100% secure checkout",
    icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
  },
  {
    title: "24/7 Support",
    subtitle: "We're here to help",
    icon: (
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 0.7 2.81 2 2 0 0 1-0.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-0.45 12.84 12.84 0 0 0 2.81 0.7A2 2 0 0 1 22 16.92z" />
    ),
  },
];

export function TrustBadgesBar() {
  return (
    <div className="border-y border-border bg-white py-7">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 sm:grid-cols-2 lg:grid-cols-4">
        {BADGES.map((badge) => (
          <div key={badge.title} className="flex items-center gap-3.5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-light">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1b6d44" strokeWidth="1.8" strokeLinecap="round">
                {badge.icon}
              </svg>
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
