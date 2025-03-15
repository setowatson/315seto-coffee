import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function BrewingPage() {
  return (
    <div className="container py-10">
      <Link href="/" className="inline-flex items-center gap-1 text-sm font-medium hover:underline mb-6">
        <ArrowLeft className="h-4 w-4" />
        ホームに戻る
      </Link>

      <div className="space-y-12">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">美味しいコーヒーの淹れ方</h1>
          <p className="text-muted-foreground text-lg">
            コーヒーは好きだけど、家で淹れる方法がわからないという方のために、美味しいコーヒーの淹れ方をご紹介します。
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/brewing-dripper.jpg-xVoHMFsSpDSaR8DLudDgcgNzQIeO9e.jpeg"
            width={600}
            height={600}
            alt="コーヒーを淹れる様子"
            className="rounded-lg object-cover"
          />
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">コーヒーを美味しく淹れるポイント</h2>
            <p>
              コーヒーを美味しく飲むために最も重要なのは「新鮮さ」です。
              飲む直前に豆から粉にして淹れるだけで、コーヒーはさらに美味しくなります。
            </p>
            <p>
              また、お湯の温度や抽出時間、豆の挽き具合なども重要なポイントです。
              ここでは、初心者の方でも簡単に美味しいコーヒーを淹れられる方法をご紹介します。
            </p>
          </div>
        </div>

        <Tabs defaultValue="drip-bag">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="drip-bag">ドリップバッグ</TabsTrigger>
            <TabsTrigger value="dripper">ドリッパー</TabsTrigger>
            <TabsTrigger value="beans">豆から淹れる</TabsTrigger>
          </TabsList>
          <TabsContent value="drip-bag" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/brewing-drip-bag.jpg-1fwC59yZXIiXQRWS6sqyIyZPgcjhds.jpeg"
                width={600}
                height={400}
                alt="ドリップバッグ"
                className="rounded-lg object-cover"
              />
              <div className="space-y-4">
                <h3 className="text-xl font-bold">まずはドリップバッグから始めよう</h3>
                <p>
                  コーヒーを淹れる道具を持っていない方や、手軽に美味しいコーヒーを楽しみたい方には、
                  ドリップバッグがおすすめです。SETO Blend Coffeeのドリップバッグは、
                  手軽に本格的な味わいを楽しめるように丁寧に作られています。
                </p>

                <div className="space-y-2">
                  <h4 className="font-semibold">ドリップバッグの淹れ方</h4>
                  <ol className="list-decimal list-inside space-y-2">
                    <li>カップの上にドリップバッグをセットし、耳を広げます。</li>
                    <li>お湯を沸かし、90℃程度まで冷まします。</li>
                    <li>コーヒーの粉全体が湿るように少量のお湯を注ぎ、30秒ほど蒸らします。</li>
                    <li>残りのお湯をゆっくりと注ぎ、抽出します。</li>
                    <li>お好みの濃さになったら、ドリップバッグを取り外します。</li>
                  </ol>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="dripper" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/brewing-dripper.jpg-xVoHMFsSpDSaR8DLudDgcgNzQIeO9e.jpeg"
                width={600}
                height={400}
                alt="ドリッパーでコーヒーを淹れる"
                className="rounded-lg object-cover"
              />
              <div className="space-y-4">
                <h3 className="text-xl font-bold">ドリッパーを使った淹れ方</h3>
                <p>
                  ドリップバッグに慣れてきたら、次はドリッパーを使ってみましょう。
                  ドリッパーを使うと、より自分好みの味わいを追求できるようになります。
                </p>

                <div className="space-y-2">
                  <h4 className="font-semibold">必要な道具</h4>
                  <ul className="list-disc list-inside space-y-1">
                    <li>ドリッパー（円錐形がおすすめ）</li>
                    <li>ペーパーフィルター</li>
                    <li>コーヒーサーバー</li>
                    <li>計量スプーン</li>
                    <li>ドリップポット（あれば）</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold">淹れ方</h4>
                  <ol className="list-decimal list-inside space-y-2">
                    <li>ペーパーフィルターをドリッパーにセットし、お湯で濡らしておきます。</li>
                    <li>コーヒー粉を入れます（カップ1杯あたり10g程度）。</li>
                    <li>90℃程度のお湯を少量注ぎ、30秒ほど蒸らします。</li>
                    <li>中心から外側に向かって、円を描くようにゆっくりとお湯を注ぎます。</li>
                    <li>1分半から2分程度かけて抽出します。</li>
                  </ol>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="beans" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/brewing-grinder.jpg-295DOZTYDMMNFan3igCrhcpdoNG5mu.jpeg"
                width={600}
                height={400}
                alt="コーヒー豆を挽く"
                className="rounded-lg object-cover"
              />
              <div className="space-y-4">
                <h3 className="text-xl font-bold">豆から淹れる本格派</h3>
                <p>
                  コーヒーをより深く楽しみたい方は、豆から挽いて淹れることをおすすめします。
                  豆から挽くことで、コーヒーの香りと風味を最大限に引き出すことができます。
                </p>

                <div className="space-y-2">
                  <h4 className="font-semibold">必要な道具</h4>
                  <ul className="list-disc list-inside space-y-1">
                    <li>コーヒーミル（手動または電動）</li>
                    <li>ドリッパー</li>
                    <li>ペーパーフィルター</li>
                    <li>コーヒーサーバー</li>
                    <li>計量スプーン</li>
                    <li>ドリップポット</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold">淹れ方</h4>
                  <ol className="list-decimal list-inside space-y-2">
                    <li>コーヒー豆を挽きます（中細挽きがおすすめ）。</li>
                    <li>ペーパーフィルターをドリッパーにセットし、お湯で濡らしておきます。</li>
                    <li>挽いたコーヒー粉を入れます。</li>
                    <li>90℃程度のお湯を少量注ぎ、30秒ほど蒸らします。</li>
                    <li>中心から外側に向かって、円を描くようにゆっくりとお湯を注ぎます。</li>
                    <li>1分半から2分程度かけて抽出します。</li>
                  </ol>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>コーヒー豆の保存方法</CardTitle>
              <CardDescription>新鮮さを保つために</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                コーヒー豆は空気、湿気、光、熱に弱いため、密閉容器に入れて冷暗所で保存しましょう。
                できれば1週間から2週間以内に使い切ることをおすすめします。
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>お湯の温度</CardTitle>
              <CardDescription>適切な抽出温度</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                コーヒーを淹れる際の最適なお湯の温度は85℃〜95℃です。
                沸騰したお湯は少し冷ましてから使用しましょう。温度が高すぎると苦味が強くなります。
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>挽き方の違い</CardTitle>
              <CardDescription>抽出方法による違い</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                ドリップ：中細挽き フレンチプレス：粗挽き エスプレッソ：極細挽き
                抽出方法によって最適な挽き方が異なります。
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="bg-muted rounded-lg p-8 text-center space-y-6">
          <h2 className="text-2xl font-bold">SETO Blend Coffeeで美味しいコーヒータイムを</h2>
          <p className="max-w-2xl mx-auto">
            ご自宅で簡単に美味しいコーヒーを淹れて、特別なひとときをお楽しみください。 SETO Blend
            Coffeeは、豆、粉、ドリップバッグの3種類の形態でご用意しています。
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

