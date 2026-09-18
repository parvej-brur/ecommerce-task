"use client";

import { User, X } from "lucide-react";
import { useEffect } from "react";
import Link from "next/link";
import { useToast } from "@/providers/ToastProvider";
import { NAV_ITEMS } from "@/components/layout/CategoryNav";

const COMING_SOON_MESSAGE = "Coming soon...";

interface MobileNavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNavDrawer({ isOpen, onClose }: MobileNavDrawerProps) {
  const { showToast } = useToast();

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <button
        aria-label="Close menu"
        onClick={onClose}
        className="fixed inset-0 z-[60] cursor-default bg-black/40 backdrop-blur-[2px] md:hidden"
      />
      <div className="fixed top-0 bottom-0 left-0 z-70 flex md:hidden">
        <div className="animate-slide-in-left flex w-72 max-w-[calc(100vw-3.5rem)] flex-col bg-white font-sans shadow-[8px_0_32px_rgba(0,0,0,0.12)]">
          <div className="bg-brand-dark px-5 pt-3 pb-4">
            <button
              type="button"
              onClick={() => showToast("info", COMING_SOON_MESSAGE)}
              className="ml-auto flex items-center gap-1.5 py-1 text-white/90 hover:text-white"
            >
              <User className="size-4" strokeWidth={1.8} />
              <span className="text-xs font-semibold">Account</span>
            </button>

            <div className="mt-2">
              <div className="text-[10px] font-semibold tracking-widest text-white/60 uppercase">
                Browse
              </div>
              <div className="text-xl leading-tight font-extrabold tracking-tight text-white">
                Sikdar Bazar
              </div>
            </div>
          </div>

          <nav className="flex flex-1 flex-col overflow-y-auto bg-white">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={onClose}
                className="border-b border-border px-5 py-3.5 text-sm font-semibold text-brand-dark hover:bg-brand-light"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="mt-3 ml-14 flex h-9 w-9 shrink-0 items-center justify-center text-white hover:text-white/80"
        >
          <X className="size-6.5" strokeWidth={3} />
        </button>
      </div>
    </>
  );
}
