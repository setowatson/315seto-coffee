import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <div className="container py-10">
      <Link href="/" className="inline-flex items-center gap-1 text-sm font-medium hover:underline mb-6">
        <ArrowLeft className="h-4 w-4" />
        ホームに戻る
      </Link>

      <div className="space-y-12">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">SETO Blend Coffeeについて</h1>
          <p className="text-muted-foreground text-lg">
            コーヒーの奥深い世界への「最初の一歩」をテーマにした特別なブレンド
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/about-image-1.jpg-Shm6yijg8WjOUKNcMAZ8vhE97xhhYW.jpeg"
            width={600}
            height={600}
            alt="新しい一歩を象徴する海辺の風景"
            className="rounded-lg object-cover"
          />
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">テーマは「最初の一歩」</h2>
            <p>
              コーヒーの世界は広く、奥深い。でも、何にだって最初の一歩を踏み出すのは、いつだって少しの勇気が必要です。
            </p>
            <p>
              SETO Blend Coffee
              は、王道のコーヒーを愛するあなたも、コーヒー初心者のあなたも、お気に入りのコーヒー豆がすでに持っているあなたも、新たな味わいの旅へ踏み出す「最初の一歩」となるように生まれました。
            </p>
            <p>親しみやすい飲みやすさの中に、ほんの少しの冒険心を。</p>
            <p>「いつもと同じ」から、一歩先の世界へ。SETO Blend Coffee で、変化のはじまりを味わいませんか？</p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="space-y-4 order-2 lg:order-1">
            <h2 className="text-2xl font-bold">シングルオリジンを2種類のみ使用</h2>
            <p>
              SETO Blend Coffeeの最大の特徴は、シングルオリジンを2種類のみ使用していること。
              2種類だと1番おいしい組み合わせ、分量を探しやすいという利点があります。
            </p>
            <p>
              7~8割は深煎り、1~2割はコロコロと気になった浅煎りをブレンドすることで、
              コクと香りのバランスが絶妙な味わいを実現しています。
            </p>
            <p>
              1ヶ月単位でシングルオリジンを入れ替えるため少しずつ味が変わりますが、
              「最初の一歩」というテーマは変更しません。 毎月異なる味わいをお楽しみいただけます。
            </p>
          </div>
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/about-image-3.jpg-ph63zTojsv4abaJvCfhvKoeGa6r5EP.jpeg"
            width={600}
            height={600}
            alt="コーヒー豆を大切に持つ手"
            className="rounded-lg object-cover order-1 lg:order-2"
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/about-image-2.jpg-9nDjWCDjBslyxcr7rydLzeLSJDuL5c.jpeg"
            width={600}
            height={600}
            alt="コーヒーを楽しむ様子"
            className="rounded-lg object-cover"
          />
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">あなただけの楽しみ方を</h2>
            <p>
              楽しみ方は人それぞれですが、SETO Blend Coffeeは「目を覚まさせるコーヒー」よりも、
              「ちょっとしたご褒美」や「スマホ・PCから離れたオアシス」的な楽しみ方をしていただきたいという願いを込めています。
            </p>
            <p>
              忙しい日常の中で、ほっと一息つける特別な時間を演出するコーヒーです。
              デジタルデバイスから離れ、コーヒーの香りと味わいに集中する時間を大切にしてください。
            </p>
          </div>
        </div>

        <div className="bg-muted rounded-lg p-8 text-center space-y-6">
          <h2 className="text-2xl font-bold">SETO Blend Coffeeを試してみませんか？</h2>
          <p className="max-w-2xl mx-auto">
            コーヒーの奥深い世界への「最初の一歩」を踏み出してみませんか？ SETO Blend
            Coffeeが、あなたのコーヒー体験をより豊かなものにするお手伝いをします。
          </p>
          <Button asChild size="lg">
            <Link href="/purchase">
              購入する
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

