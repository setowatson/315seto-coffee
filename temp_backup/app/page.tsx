import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Coffee, Gift, Info, User, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-10 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Coffee className="h-6 w-6" />
            <span>SETO Blend Coffee</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/purchase" className="text-sm font-medium hover:text-primary">
              購入
            </Link>
            <Link href="/about" className="text-sm font-medium hover:text-primary">
              コーヒーについて
            </Link>
            <Link href="/brewing" className="text-sm font-medium hover:text-primary">
              淹れ方
            </Link>
            <Link href="/profile" className="text-sm font-medium hover:text-primary">
              プロフィール
            </Link>
            <Link href="/faq" className="text-sm font-medium hover:text-primary">
              FAQ
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <Button asChild size="sm">
              <Link href="/purchase">
                購入する
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="icon" className="md:hidden">
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
                className="h-6 w-6"
              >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 relative">
          <div className="absolute inset-0 bg-[url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hero-background.jpg-PWsqaW7sDW2uTCWnnp46GsNgFQYlvS.jpeg')] bg-cover bg-center"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30"></div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white">
                  朝を彩る、一杯の贅沢
                </h1>
                <p className="mx-auto max-w-[700px] text-white md:text-xl text-white/90 drop-shadow-md">
                  SETO Blend Coffeeは、コーヒーの奥深い世界への「最初の一歩」をテーマにした特別なブレンドです。
                </p>
              </div>
              <div className="space-x-4">
                <Button asChild size="lg" className="bg-white/90 hover:bg-white text-black">
                  <Link href="/purchase">
                    今すぐ購入する
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white/20 bg-black/30"
                >
                  <Link href="/about">詳しく見る</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">厳選された豆</h3>
                  <p className="text-muted-foreground">
                    2種類のシングルオリジンを絶妙な配合でブレンド。深煎りと浅煎りの絶妙なバランスをお楽しみください。
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">毎月変わる味わい</h3>
                  <p className="text-muted-foreground">
                    1ヶ月単位でシングルオリジンを入れ替え、少しずつ変化する味わいをお楽しみいただけます。
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">毎日のちょっとした贅沢に</h3>
                  <p className="text-muted-foreground">
                    デジタルから離れた時間、ちょっとした休息に最適な一杯。特別なひとときをお届けします。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">最初の一歩</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">コーヒーの奥深い世界へ</h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
                  王道のコーヒーの味が好きな方にとって、コーヒーの奥深い世界へ踏み出す「最初の一歩目」となるようなコーヒーを目指しています。誰だって変化は怖いけど、最初の一歩が大事だと考えています。
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild>
                    <Link href="/about">
                      詳しく見る
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/coffee-beans.jpg-wXSniSHcICfSzPZnLfr8RgRn2CSnPg.jpeg"
                width={600}
                height={400}
                alt="コーヒー豆のイメージ"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">メニュー</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  SETO Blend Coffeeをご案内します
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
              <Link
                href="/purchase"
                className="group relative overflow-hidden rounded-lg border bg-background p-6 text-center shadow transition-all hover:shadow-lg"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background z-10"></div>
                <div className="relative z-20">
                  <Coffee className="mx-auto h-10 w-10 mb-4" />
                  <h3 className="text-xl font-bold">購入する</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    お好みのグラム数、挽き方を選んでご購入いただけます
                  </p>
                  <Button variant="link" className="mt-4">
                    詳しく見る
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </Link>
              <Link
                href="/about"
                className="group relative overflow-hidden rounded-lg border bg-background p-6 text-center shadow transition-all hover:shadow-lg"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background z-10"></div>
                <div className="relative z-20">
                  <Info className="mx-auto h-10 w-10 mb-4" />
                  <h3 className="text-xl font-bold">コーヒーについて</h3>
                  <p className="text-sm text-muted-foreground mt-2">SETO Blend Coffeeの特徴やこだわりをご紹介します</p>
                  <Button variant="link" className="mt-4">
                    詳しく見る
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </Link>
              <Link
                href="/brewing"
                className="group relative overflow-hidden rounded-lg border bg-background p-6 text-center shadow transition-all hover:shadow-lg"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background z-10"></div>
                <div className="relative z-20">
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
                    className="mx-auto h-10 w-10 mb-4"
                  >
                    <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
                    <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
                    <line x1="6" x2="6" y1="2" y2="4" />
                    <line x1="10" x2="10" y1="2" y2="4" />
                    <line x1="14" x2="14" y1="2" y2="4" />
                  </svg>
                  <h3 className="text-xl font-bold">淹れ方</h3>
                  <p className="text-sm text-muted-foreground mt-2">美味しいコーヒーの淹れ方をご紹介します</p>
                  <Button variant="link" className="mt-4">
                    詳しく見る
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </Link>
              <Link
                href="/profile"
                className="group relative overflow-hidden rounded-lg border bg-background p-6 text-center shadow transition-all hover:shadow-lg"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background z-10"></div>
                <div className="relative z-20">
                  <User className="mx-auto h-10 w-10 mb-4" />
                  <h3 className="text-xl font-bold">プロフィール</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    SETOのプロフィールとコーヒーへの想いをご紹介します
                  </p>
                  <Button variant="link" className="mt-4">
                    詳しく見る
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </Link>
              <Link
                href="/faq"
                className="group relative overflow-hidden rounded-lg border bg-background p-6 text-center shadow transition-all hover:shadow-lg"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background z-10"></div>
                <div className="relative z-20">
                  <HelpCircle className="mx-auto h-10 w-10 mb-4" />
                  <h3 className="text-xl font-bold">よくある質問</h3>
                  <p className="text-sm text-muted-foreground mt-2">コーヒーに関するよくある質問にお答えします</p>
                  <Button variant="link" className="mt-4">
                    詳しく見る
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </Link>
              <Link
                href="/purchase"
                className="group relative overflow-hidden rounded-lg border bg-background p-6 text-center shadow transition-all hover:shadow-lg"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background z-10"></div>
                <div className="relative z-20">
                  <Gift className="mx-auto h-10 w-10 mb-4" />
                  <h3 className="text-xl font-bold">ギフト</h3>
                  <p className="text-sm text-muted-foreground mt-2">大切な方へのギフトとしてもご利用いただけます</p>
                  <Button variant="link" className="mt-4">
                    詳しく見る
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </Link>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 border-t">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">あなたの朝に、特別な一杯を</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  SETO Blend Coffeeで、特別なコーヒータイムをお楽しみください
                </p>
              </div>
              <div className="mx-auto w-full max-w-sm space-y-2">
                <Button asChild size="lg" className="w-full">
                  <Link href="/purchase">
                    今すぐ購入する
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} SETO Blend Coffee. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Instagram
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              X
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Blog
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

