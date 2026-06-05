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
  metadataBase: new URL("https://floxanimeindia.com"),

  title: "Flox Anime India",
  description: "Flox Anime India - Anime video streaming and animation platform",

  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },

  openGraph: {
    title: "Flox Anime India",
    description: "Flox Anime India - Anime video streaming and animation platform",
    url: "https://floxanimeindia.com",
    siteName: "Flox Anime India",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "Flox Anime India Logo",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Flox Anime India",
    description: "Flox Anime India - Anime video streaming and animation platform",
    images: ["/logo.png"],
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