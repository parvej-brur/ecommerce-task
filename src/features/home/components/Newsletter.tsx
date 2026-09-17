"use client";

import { useState } from "react";
import { useToast } from "@/providers/ToastProvider";

export function Newsletter() {
  const { showToast } = useToast();
  const [email, setEmail] = useState("");

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!email.trim()) return;
    showToast("success", "Subscribed! Check your inbox soon.");
    setEmail("");
  }

  return (
    <div className="bg-brand-dark px-6 py-12">
      <div className="mx-auto max-w-150 text-center">
        <h2 className="mb-2 text-2xl font-extrabold text-white">Subscribe to Our Newsletter</h2>
        <p className="mb-6 text-[13px] text-white/60">
          Get the latest updates on new arrivals, exclusive offers &amp; more.
        </p>
        <form onSubmit={handleSubmit} className="mx-auto flex max-w-120 flex-col gap-2 overflow-hidden rounded-lg sm:flex-row sm:gap-0">
          <input
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter your email address"
            className="min-w-0 flex-1 rounded-lg bg-white px-4 py-3.5 font-sans text-[13px] text-brand-dark placeholder:text-zinc-400 focus:outline-none sm:rounded-l-lg sm:rounded-r-none"
          />
          <button
            type="submit"
            className="rounded-lg bg-gold px-6 py-3.5 text-[13px] font-bold whitespace-nowrap text-brand-dark hover:bg-gold-hover sm:rounded-l-none sm:rounded-r-lg"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
}
