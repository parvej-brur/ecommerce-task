const ANNOUNCEMENTS = [
  {
    label: "Free Delivery on Orders over ৳50",
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
    label: "30 Days Easy Return",
    icon: (
      <>
        <polyline points="23 4 23 10 17 10" />
        <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
      </>
    ),
  },
  {
    label: "100% Secure Payment",
    icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
  },
  {
    label: "Genuine Products",
    icon: <polyline points="20 6 9 17 4 12" />,
  },
];

export function AnnouncementBar() {
  return (
    <div className="hidden bg-brand-dark md:block">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-8 px-6 py-2 text-xs font-medium tracking-wide text-white">
        {ANNOUNCEMENTS.map((item) => (
          <span key={item.label} className="flex items-center gap-1.5">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#4ade80"
              strokeWidth="2"
              strokeLinecap="round"
            >
              {item.icon}
            </svg>
            {item.label}
          </span>
        ))}
      </div>
    </div>
  );
}
