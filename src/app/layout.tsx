import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { MainLayout } from "@/components/layout/MainLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Seto Coffee",
  description: "A modern coffee shop e-commerce platform",
  keywords: ["coffee", "shop", "ecommerce", "beans", "drinks"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <MainLayout>{children}</MainLayout>
        <Toaster position="top-right" expand={true} richColors closeButton />
      </body>
    </html>
  );
}
