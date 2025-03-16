import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Coffee, Gift, Info, User, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 relative">
          <div className="absolute inset-0 bg-[url('/images/hero-background.jpeg')] bg-cover bg-center"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30"></div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center space-y-6 text-center">
              <div className="space-y-3">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white drop-shadow-md">
                  朝を彩る、一杯の贅沢
                </h1>
                <p className="mx-auto max-w-[700px] text-white md:text-xl text-white/90 drop-shadow-md">
                  SETO Blend Coffeeは、コーヒーの奥深い世界への「最初の一歩」をテーマにした特別なブレンドです。
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 sm:space-x-4">
                <Button asChild size="lg" className="bg-amber-700 hover:bg-amber-800 text-white shadow-lg">
                  <Link href="/purchase">
                    今すぐ購入する
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white/20 bg-black/30 shadow-lg"
                >
                  <Link href="/about">詳しく見る</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        <section className="w-full py-16 md:py-24 bg-amber-50">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight mb-4">こだわりの一杯</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                SETO Blend Coffeeは、厳選された豆と丁寧な焙煎で、コーヒーの奥深さを感じていただけるブレンドです。
              </p>
            </div>
            <div className="grid gap-8 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center space-y-4 text-center bg-white p-6 rounded-xl shadow-sm">
                <div className="w-20 h-20 rounded-full overflow-hidden mb-2 bg-amber-100 flex items-center justify-center">
                  <Image 
                    src="/images/coffee-beans-closeup.jpeg" 
                    alt="厳選された豆" 
                    width={80}
                    height={80}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-gray-900">厳選された豆</h3>
                  <p className="text-gray-600">
                    2種類のシングルオリジンを絶妙な配合でブレンド。深煎りと浅煎りの絶妙なバランスをお楽しみください。
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center bg-white p-6 rounded-xl shadow-sm">
                <div className="w-20 h-20 rounded-full overflow-hidden mb-2 bg-amber-100 flex items-center justify-center">
                  <Image 
                    src="/images/coffee-cup.jpeg" 
                    alt="毎月変わる味わい" 
                    width={80}
                    height={80}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-gray-900">毎月変わる味わい</h3>
                  <p className="text-gray-600">
                    1ヶ月単位でシングルオリジンを入れ替え、少しずつ変化する味わいをお楽しみいただけます。
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center bg-white p-6 rounded-xl shadow-sm">
                <div className="w-20 h-20 rounded-full overflow-hidden mb-2 bg-amber-100 flex items-center justify-center">
                  <Image 
                    src="/images/about-image-2.jpeg" 
                    alt="毎日のちょっとした贅沢に" 
                    width={80}
                    height={80}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-gray-900">毎日のちょっとした贅沢に</h3>
                  <p className="text-gray-600">
                    デジタルから離れた時間、ちょっとした休息に最適な一杯。特別なひとときをお届けします。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="w-full py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
              <div className="space-y-5">
                <div className="inline-block rounded-lg bg-amber-100 px-3 py-1 text-sm font-medium text-amber-800">最初の一歩</div>
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl/tight text-gray-900">コーヒーの奥深い世界へ</h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  王道のコーヒーの味が好きな方にとって、コーヒーの奥深い世界へ踏み出す「最初の一歩目」となるようなコーヒーを目指しています。誰だって変化は怖いけど、最初の一歩が大事だと考えています。
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild className="bg-amber-700 hover:bg-amber-800">
                    <Link href="/about">
                      詳しく見る
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/images/coffee-beans-closeup.jpeg"
                  alt="コーヒー豆のイメージ"
                  width={600}
                  height={400}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </section>
        
        <section className="w-full py-16 md:py-24 bg-amber-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-gray-900">メニュー</h2>
                <p className="max-w-[900px] text-lg text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  SETO Blend Coffeeをご案内します
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-6 lg:grid-cols-3 md:grid-cols-2">
              <Link
                href="/purchase"
                className="group relative overflow-hidden rounded-xl border bg-white p-6 text-center shadow-sm transition-all hover:shadow-md"
              >
                <div className="absolute inset-0 bg-[url('/images/seto-blend-package.jpeg')] bg-cover bg-center opacity-10"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white z-10"></div>
                <div className="relative z-20">
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Coffee className="h-8 w-8 text-amber-700" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">購入する</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    お好みのグラム数、挽き方を選んでご購入いただけます
                  </p>
                  <Button variant="outline" className="mt-2 border-amber-700 text-amber-700 hover:bg-amber-50">
                    詳しく見る
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </Link>
              <Link
                href="/about"
                className="group relative overflow-hidden rounded-xl border bg-white p-6 text-center shadow-sm transition-all hover:shadow-md"
              >
                <div className="absolute inset-0 bg-[url('/images/about-image-1.jpeg')] bg-cover bg-center opacity-10"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white z-10"></div>
                <div className="relative z-20">
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Info className="h-8 w-8 text-amber-700" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">コーヒーについて</h3>
                  <p className="text-sm text-gray-600 mb-4">SETO Blend Coffeeの特徴やこだわりをご紹介します</p>
                  <Button variant="outline" className="mt-2 border-amber-700 text-amber-700 hover:bg-amber-50">
                    詳しく見る
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </Link>
              <Link
                href="/brewing"
                className="group relative overflow-hidden rounded-xl border bg-white p-6 text-center shadow-sm transition-all hover:shadow-md"
              >
                <div className="absolute inset-0 bg-[url('/images/brewing-dripper.jpeg')] bg-cover bg-center opacity-10"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white z-10"></div>
                <div className="relative z-20">
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
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
                      className="h-8 w-8 text-amber-700"
                    >
                      <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
                      <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
                      <line x1="6" x2="6" y1="2" y2="4" />
                      <line x1="10" x2="10" y1="2" y2="4" />
                      <line x1="14" x2="14" y1="2" y2="4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">淹れ方</h3>
                  <p className="text-sm text-gray-600 mb-4">美味しいコーヒーの淹れ方をご紹介します</p>
                  <Button variant="outline" className="mt-2 border-amber-700 text-amber-700 hover:bg-amber-50">
                    詳しく見る
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </Link>
              <Link
                href="/profile"
                className="group relative overflow-hidden rounded-xl border bg-white p-6 text-center shadow-sm transition-all hover:shadow-md"
              >
                <div className="absolute inset-0 bg-[url('/images/seto-profile.jpeg')] bg-cover bg-center opacity-10"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white z-10"></div>
                <div className="relative z-20">
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="h-8 w-8 text-amber-700" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">プロフィール</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    SETOのプロフィールとコーヒーへの想いをご紹介します
                  </p>
                  <Button variant="outline" className="mt-2 border-amber-700 text-amber-700 hover:bg-amber-50">
                    詳しく見る
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </Link>
              <Link
                href="/faq"
                className="group relative overflow-hidden rounded-xl border bg-white p-6 text-center shadow-sm transition-all hover:shadow-md"
              >
                <div className="absolute inset-0 bg-[url('/images/coffee-cup.jpeg')] bg-cover bg-center opacity-10"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white z-10"></div>
                <div className="relative z-20">
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <HelpCircle className="h-8 w-8 text-amber-700" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">よくある質問</h3>
                  <p className="text-sm text-gray-600 mb-4">コーヒーに関するよくある質問にお答えします</p>
                  <Button variant="outline" className="mt-2 border-amber-700 text-amber-700 hover:bg-amber-50">
                    詳しく見る
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </Link>
              <Link
                href="/purchase"
                className="group relative overflow-hidden rounded-xl border bg-white p-6 text-center shadow-sm transition-all hover:shadow-md"
              >
                <div className="absolute inset-0 bg-[url('/images/coffee-cup.jpeg')] bg-cover bg-center opacity-10"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white z-10"></div>
                <div className="relative z-20">
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Gift className="h-8 w-8 text-amber-700" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">ギフト</h3>
                  <p className="text-sm text-gray-600 mb-4">大切な方へのギフトとしてもご利用いただけます</p>
                  <Button variant="outline" className="mt-2 border-amber-700 text-amber-700 hover:bg-amber-50">
                    詳しく見る
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </Link>
            </div>
          </div>
        </section>
        
        <section className="w-full py-16 md:py-24 bg-amber-700 text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-6 text-center">
              <div className="space-y-3">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">あなたの朝に、特別な一杯を</h2>
                <p className="max-w-[900px] text-amber-100 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  SETO Blend Coffeeで、特別なコーヒータイムをお楽しみください
                </p>
              </div>
              <div className="mx-auto w-full max-w-sm space-y-2">
                <Button asChild size="lg" className="w-full bg-white text-amber-700 hover:bg-amber-50">
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
      
      <footer className="w-full border-t py-8 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <Link href="/" className="flex items-center gap-2 font-bold text-xl mb-4">
                <Coffee className="h-6 w-6 text-amber-700" />
                <span>SETO Blend Coffee</span>
              </Link>
              <p className="text-sm text-gray-500 mb-4">
                コーヒーの奥深い世界への「最初の一歩」をテーマにした特別なブレンド
              </p>
              <p className="text-sm text-gray-500">
                &copy; {new Date().getFullYear()} SETO Blend Coffee. All rights reserved.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">リンク</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/purchase" className="text-sm text-gray-500 hover:text-amber-700">
                    購入
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-sm text-gray-500 hover:text-amber-700">
                    コーヒーについて
                  </Link>
                </li>
                <li>
                  <Link href="/brewing" className="text-sm text-gray-500 hover:text-amber-700">
                    淹れ方
                  </Link>
                </li>
                <li>
                  <Link href="/profile" className="text-sm text-gray-500 hover:text-amber-700">
                    プロフィール
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-sm text-gray-500 hover:text-amber-700">
                    よくある質問
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">お問い合わせ</h3>
              <p className="text-sm text-gray-500 mb-4">
                ご質問やお問い合わせは、以下のSNSからお気軽にどうぞ。
              </p>
              <div className="flex gap-4">
                <a 
                  href="https://www.instagram.com/shu_no_kristoff?igsh=MWJpdmk4eHAyNGZwNA%3D%3D&utm_source=qr" 
                  className="text-sm text-gray-500 hover:text-amber-700"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
                <a 
                  href="https://rogue-boat-75a.notion.site/Seto-s-Diary-1aacf2b416868011bcbbf441df15a054" 
                  className="text-sm text-gray-500 hover:text-amber-700"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Blog
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
