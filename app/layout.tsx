import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Layout/Navbar";
import Footer from "@/components/Layout/Footer";

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant-garamond",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Aryan Art Gallery | Premium Luxury Art Gallery",
    template: "%s | Aryan Art Gallery",
  },
  description: "Experience the world of fine art at Aryan Art Gallery. Exhibiting masterworks from renowned global artists, curated collections, and exclusive exhibitions.",
  keywords: ["Art Gallery", "Fine Art", "Aryan Art Gallery", "Paintings", "Exhibitions", "Luxury Art"],
  authors: [{ name: "Aryan Art Gallery" }],
  openGraph: {
    title: "Aryan Art Gallery | Premium Luxury Art Gallery",
    description: "Experience the world of fine art at Aryan Art Gallery. Exhibiting masterworks from renowned global artists, curated collections, and exclusive exhibitions.",
    url: "https://aryanartgallery.com",
    siteName: "Aryan Art Gallery",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aryan Art Gallery | Premium Luxury Art Gallery",
    description: "Experience the world of fine art at Aryan Art Gallery. Exhibiting masterworks from renowned global artists, curated collections, and exclusive exhibitions.",
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
      className={`${cormorantGaramond.variable} ${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground transition-colors duration-300">
        <ThemeProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
