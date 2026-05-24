import type { Metadata } from "next";
import { Geist, Geist_Mono, Yuji_Syuku } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const yujiSyuku = Yuji_Syuku({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-yuji",
});

export const metadata: Metadata = {
  title: "鏡花水月城",
  description: "現実と幻想の境界に浮かぶ、静謐なる城",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${geistSans.variable} ${geistMono.variable} ${yujiSyuku.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}