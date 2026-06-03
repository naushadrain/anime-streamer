import type { Metadata } from "next";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Flox Anime India",
  description: "Flox Anime India - Anime video streaming and animation platform",
  icons: {
    icon: [
      {
        url: "/logo.png",
        type: "image/png",
        sizes: "32x32",
      },
    ],
    shortcut: "/logo.png",
    apple: [
      {
        url: "/logo.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  openGraph: {
    title: "Flox Anime India",
    description: "Flox Anime India - Anime video streaming and animation platform",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "Flox Anime India Logo",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full antialiased", "font-sans", geist.variable)}
    >
      <body className="flex min-h-full flex-col">
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}