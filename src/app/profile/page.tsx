import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Coffee } from "lucide-react"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/layout/navbar/navbar"

export default function ProfilePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <div className="container py-10">
        <Link href="/" className="inline-flex items-center gap-1 text-sm font-medium hover:underline mb-6">
          <ArrowLeft className="h-4 w-4" />
          ホームに戻る
        </Link>

        <div className="space-y-12">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">SETOのプロフィール</h1>
            <p className="text-gray-500 text-lg">SETO Blend Coffeeを作る人</p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="relative h-24 w-24 overflow-hidden rounded-full">
                  <Image
                    src="/images/seto-profile.jpeg"
                    width={100}
                    height={100}
                    alt="SETOのイラスト"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">SETO</h2>
                  <p className="text-gray-500">コーヒー愛好家 / 開発コンサルタント</p>
                </div>
              </div>

              <div className="space-y-4">
                <p>
                  普段は開発コンサルタント、プロジェクトマネージャーとして働いています。
                  デジタルの世界で日々奮闘する中で、アナログな趣味としてコーヒーに出会いました。
                </p>
                <p>
                  コーヒーを入れ続けて6年、自分で作るブレンドを作りたいと思い、現在修行中です。
                  コーヒーの奥深さに魅了され、日々新しい発見を楽しんでいます。
                </p>
                <p>
                  次なる挑戦は、焙煎から自分で実践すること。 より深くコーヒーの世界に踏み込んでいきたいと考えています。
                </p>
                <p>食品衛生管理者の資格を取得済みで、安全で美味しいコーヒーをお届けすることを心がけています。</p>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">SNS / ブログ</h3>
                <div className="flex flex-wrap gap-3">
                  <Button variant="outline" size="sm" asChild>
                    <Link href="https://rogue-boat-75a.notion.site/Seto-s-Diary-1aacf2b416868011bcbbf441df15a054" target="_blank" rel="noopener noreferrer">
                      ブログ
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="https://www.instagram.com/shu_no_kristoff?igsh=MWJpdmk4eHAyNGZwNA%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer">
                      Instagram
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
            <Image
              src="/images/seto-brewing.jpeg"
              width={600}
              height={600}
              alt="コーヒーを淹れるSETO"
              className="rounded-lg object-cover"
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-3 border rounded-lg p-6">
              <h3 className="font-bold text-lg">コーヒーとの出会い</h3>
              <p className="text-sm text-gray-500">
                大学時代、友人に連れられて行った自家焙煎のカフェで飲んだ一杯のコーヒーがきっかけでした。
                それまでコーヒーは苦いだけのものだと思っていましたが、その一杯の香りと味わいに衝撃を受け、
                コーヒーの世界に足を踏み入れることになりました。
              </p>
            </div>
            <div className="space-y-3 border rounded-lg p-6">
              <h3 className="font-bold text-lg">コーヒーへの想い</h3>
              <p className="text-sm text-gray-500">
                コーヒーは単なる飲み物ではなく、一杯のコーヒーを通じて特別な時間を過ごすための媒体だと考えています。
                忙しい日常の中で、コーヒーを淹れる時間、飲む時間は、自分自身と向き合う貴重な時間です。
                そんな特別な時間をSETO Blend Coffeeを通じて多くの方に体験していただきたいと思っています。
              </p>
            </div>
            <div className="space-y-3 border rounded-lg p-6">
              <h3 className="font-bold text-lg">ブレンドへのこだわり</h3>
              <p className="text-sm text-gray-500">
                SETO Blend Coffeeは、コーヒーの奥深い世界への「最初の一歩」をテーマにしています。
                親しみやすさと奥深さを両立させるために、2種類のシングルオリジンを厳選し、
                絶妙なバランスでブレンドしています。
                毎月少しずつ変化する味わいを通じて、コーヒーの多様性を感じていただければ幸いです。
              </p>
            </div>
          </div>

          <div className="bg-amber-50 rounded-lg p-8 space-y-6">
            <h2 className="text-2xl font-bold text-center">メッセージ</h2>
            <p className="max-w-2xl mx-auto text-center">
              SETO Blend Coffeeを通じて、皆さんの日常に小さな幸せの瞬間をお届けできれば幸いです。
              コーヒーの奥深い世界への「最初の一歩」を一緒に踏み出しましょう。
              皆さんからのフィードバックもお待ちしています。
            </p>
          </div>
        </div>
      </div>
      
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