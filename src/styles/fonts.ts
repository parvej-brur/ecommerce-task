import { Geist, Geist_Mono } from "next/font/google";

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Applied on <html> so every font variable is available to Tailwind.
export const fontVariables = `${geistSans.variable} ${geistMono.variable}`;
