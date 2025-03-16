import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { CartProvider } from '@/lib/cart-context';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "315 Coffee",
  description: "最高品質のコーヒー豆を提供する専門店",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <CartProvider>
          <Providers>
            {children}
            <Toaster />
          </Providers>
        </CartProvider>
      </body>
    </html>
  );
}
