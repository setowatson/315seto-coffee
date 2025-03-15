import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold coffee-text-gradient">Seto Coffee</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/products" className="text-sm font-medium hover:text-primary/80">
            商品一覧
          </Link>
          <Link href="/about" className="text-sm font-medium hover:text-primary/80">
            店舗情報
          </Link>
          <Link href="/contact" className="text-sm font-medium hover:text-primary/80">
            お問い合わせ
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="relative">
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-xs text-primary-foreground flex items-center justify-center">
              0
            </span>
          </Button>
        </div>
      </div>
    </header>
  )
} 