import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
const inter = Inter({ subsets: ["latin"] });
import Head from "next/head";

export const metadata: Metadata = {
  title: "The Craxy Stories",
  description:
    "Imagine a place where you can swap tales of daring escapades, unexpected twists, and heartwarming moments with a community of fellow adventurers. Whether you've survived a wild adventure abroad, stumbled upon a hidden gem in your hometown, or had a hilarious mishap that's too good not to share, you'll find kindred spirits here.",
  icons: {
    icon: "favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      <body suppressHydrationWarning={true} className={inter.className}>
        <Navbar />

        {children}
      </body>
    </html>
  );
}
