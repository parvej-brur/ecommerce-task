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
        <form onSubmit={handleSubmit} className="mx-auto flex max-w-120 flex-col overflow-hidden rounded-lg sm:flex-row">
          <input
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter your email address"
            className="min-w-0 flex-1 px-4 py-3.5 font-sans text-[13px] text-brand-dark focus:outline-none"
          />
          <button
            type="submit"
            className="bg-danger px-6 py-3.5 text-[13px] font-bold whitespace-nowrap text-white hover:bg-danger-hover"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
}
