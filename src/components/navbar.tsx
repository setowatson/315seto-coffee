"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Coffee, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import CartIcon from "./cart-icon";

export default function Navbar() {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <Coffee className="h-6 w-6 text-amber-700" />
          <span>SETO Blend Coffee</span>
        </Link>
        
        <nav className="hidden md:flex gap-6">
          <Link 
            href="/purchase" 
            className={`text-sm font-medium hover:text-amber-700 ${pathname === '/purchase' ? 'text-amber-700 font-semibold' : ''}`}
          >
            購入
          </Link>
          <Link 
            href="/about" 
            className={`text-sm font-medium hover:text-amber-700 ${pathname === '/about' ? 'text-amber-700 font-semibold' : ''}`}
          >
            コーヒーについて
          </Link>
          <Link 
            href="/brewing" 
            className={`text-sm font-medium hover:text-amber-700 ${pathname === '/brewing' ? 'text-amber-700 font-semibold' : ''}`}
          >
            淹れ方
          </Link>
          <Link 
            href="/profile" 
            className={`text-sm font-medium hover:text-amber-700 ${pathname === '/profile' ? 'text-amber-700 font-semibold' : ''}`}
          >
            プロフィール
          </Link>
          <Link 
            href="/faq" 
            className={`text-sm font-medium hover:text-amber-700 ${pathname === '/faq' ? 'text-amber-700 font-semibold' : ''}`}
          >
            FAQ
          </Link>
        </nav>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-4">
            <CartIcon />
            
            {status === "authenticated" ? (
              <>
                <span className="text-sm text-muted-foreground">
                  {session.user?.name || session.user?.email}
                </span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => signOut({ redirect: true, callbackUrl: "/" })}
                >
                  ログアウト
                </Button>
              </>
            ) : (
              <Button variant="ghost" size="sm" asChild>
                <Link href="/auth/signin">
                  ログイン
                </Link>
              </Button>
            )}
          </div>
          
          <Button asChild size="sm" className="hidden md:inline-flex bg-amber-700 hover:bg-amber-800">
            <Link href="/purchase">
              購入する
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          
          <Button variant="outline" size="icon" className="md:hidden" onClick={toggleMenu}>
            <span className="sr-only">メニュー</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`h-6 w-6 ${isMenuOpen ? "hidden" : "block"}`}
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`h-6 w-6 ${isMenuOpen ? "block" : "hidden"}`}
            >
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </Button>
        </div>
      </div>

      {/* モバイルメニュー */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-white">
          <div className="container py-4 space-y-4">
            <Link
              href="/"
              className={`flex items-center py-2 text-sm font-medium hover:text-amber-700 ${pathname === '/' ? 'text-amber-700 font-semibold' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              ホーム
            </Link>
            <Link
              href="/purchase"
              className={`flex items-center py-2 text-sm font-medium hover:text-amber-700 ${pathname === '/purchase' ? 'text-amber-700 font-semibold' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              購入
            </Link>
            <Link
              href="/about"
              className={`flex items-center py-2 text-sm font-medium hover:text-amber-700 ${pathname === '/about' ? 'text-amber-700 font-semibold' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              コーヒーについて
            </Link>
            <Link
              href="/brewing"
              className={`flex items-center py-2 text-sm font-medium hover:text-amber-700 ${pathname === '/brewing' ? 'text-amber-700 font-semibold' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              淹れ方
            </Link>
            <Link
              href="/profile"
              className={`flex items-center py-2 text-sm font-medium hover:text-amber-700 ${pathname === '/profile' ? 'text-amber-700 font-semibold' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              プロフィール
            </Link>
            <Link
              href="/faq"
              className={`flex items-center py-2 text-sm font-medium hover:text-amber-700 ${pathname === '/faq' ? 'text-amber-700 font-semibold' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              FAQ
            </Link>
            <Link
              href="/cart"
              className={`flex items-center py-2 text-sm font-medium hover:text-amber-700 ${pathname === '/cart' ? 'text-amber-700 font-semibold' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              カート
            </Link>
            
            <div className="pt-4 border-t">
              {status === "authenticated" ? (
                <>
                  <div className="py-2 text-sm text-muted-foreground">
                    {session.user?.name || session.user?.email}
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => {
                      signOut({ redirect: true, callbackUrl: "/" });
                      setIsMenuOpen(false);
                    }}
                    className="px-0"
                  >
                    ログアウト
                  </Button>
                </>
              ) : (
                <Button variant="ghost" size="sm" asChild className="px-0">
                  <Link href="/auth/signin" onClick={() => setIsMenuOpen(false)}>
                    ログイン
                  </Link>
                </Button>
              )}
            </div>
            
            <div className="pt-4">
              <Button asChild size="sm" className="w-full bg-amber-700 hover:bg-amber-800">
                <Link href="/purchase" onClick={() => setIsMenuOpen(false)}>
                  購入する
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
} 