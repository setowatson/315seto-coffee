import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="hero-pattern py-20 md:py-32">
        <div className="container">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Discover the Perfect
              <span className="block coffee-text-gradient">Coffee Experience</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              厳選された豆と熟練の焙煎技術で、最高品質のコーヒーをお届けします。
              一杯一杯に込められた情熱と技術を、ぜひご体験ください。
            </p>
            <div className="mt-8 flex gap-4">
              <Button asChild size="lg">
                <Link href="/products">商品を見る</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/about">店舗情報</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <h2 className="text-3xl font-bold tracking-tight text-center mb-12">
            Why Choose Seto Coffee?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">厳選された豆</h3>
              <p className="text-muted-foreground">
                世界中から厳選された最高品質のコーヒー豆を使用しています。
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">熟練の焙煎</h3>
              <p className="text-muted-foreground">
                経験豊富な職人による丁寧な焙煎で、豆本来の味わいを引き出します。
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">新鮮なお届け</h3>
              <p className="text-muted-foreground">
                焙煎したての新鮮な豆を、最適な状態でお届けします。
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
