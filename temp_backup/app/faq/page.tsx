"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FAQPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // ここで実際のフォーム送信処理を行う
    console.log({ name, email, message })
    setSubmitted(true)
    setName("")
    setEmail("")
    setMessage("")
  }

  return (
    <div className="container py-10">
      <Link href="/" className="inline-flex items-center gap-1 text-sm font-medium hover:underline mb-6">
        <ArrowLeft className="h-4 w-4" />
        ホームに戻る
      </Link>

      <div className="space-y-12">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">よくある質問</h1>
          <p className="text-muted-foreground text-lg">SETO Blend Coffeeに関するよくある質問にお答えします</p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>コーヒー豆の保存方法は？</AccordionTrigger>
            <AccordionContent>
              <p>
                コーヒー豆は空気、湿気、光、熱に弱いため、密閉容器に入れて冷暗所で保存することをおすすめします。
                特に開封後は、専用の保存容器や、チャック付きの袋に入れて空気を抜いて保存すると良いでしょう。
                また、できれば2〜3週間以内に使い切ることをおすすめします。
                長期保存する場合は、小分けにして冷凍保存も可能ですが、解凍後はすぐに使い切るようにしてください。
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>コーヒーの挽き方の違いは何ですか？</AccordionTrigger>
            <AccordionContent>
              <p>コーヒーの挽き方は抽出方法によって最適な粒度が異なります。 一般的には以下のような目安があります：</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>極細挽き：エスプレッソ</li>
                <li>細挽き：ペーパードリップ（円錐形）</li>
                <li>中細挽き：ペーパードリップ（台形）</li>
                <li>中挽き：サイフォン、ネルドリップ</li>
                <li>粗挽き：フレンチプレス、水出し</li>
              </ul>
              <p className="mt-2">SETO Blend Coffeeでは、ご注文時に抽出方法に合わせた挽き方を選択いただけます。</p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>コーヒーの味わいはどのようなものですか？</AccordionTrigger>
            <AccordionContent>
              <p>
                SETO Blend Coffeeは、「最初の一歩」をテーマにした親しみやすさと奥深さを兼ね備えたブレンドです。
                7〜8割の深煎りと1〜2割の浅煎りをブレンドすることで、コクと香りのバランスが取れた味わいに仕上げています。
                苦味と酸味のバランスが良く、ミルクを入れても美味しく飲めるよう設計されています。
                また、1ヶ月単位でシングルオリジンを入れ替えるため、少しずつ味わいが変化するのも特徴です。
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>配送はどのくらいかかりますか？</AccordionTrigger>
            <AccordionContent>
              <p>
                ご注文確認後、1〜3営業日以内に発送いたします。
                通常、発送後1〜3日程度でお届けいたしますが、地域や配送状況によって異なる場合があります。
                配送状況はご注文時にお送りする追跡番号からご確認いただけます。
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger>ギフト包装は可能ですか？</AccordionTrigger>
            <AccordionContent>
              <p>
                はい、ギフト包装サービスをご用意しております。
                ご購入時に「ギフト包装する」を選択いただくと、メッセージカードの追加や、
                オリジナル画像のアップロードも可能です。 アップロードいただいた画像は包装紙に印刷されます。
                大切な方へのプレゼントとして、特別な一杯をお届けします。
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-6">
            <AccordionTrigger>賞味期限はどのくらいですか？</AccordionTrigger>
            <AccordionContent>
              <p>
                SETO Blend Coffeeの賞味期限は、製造日より3ヶ月です（未開封の場合）。
                ただし、コーヒーは新鮮なほど美味しいため、できるだけ早めにお召し上がりいただくことをおすすめします。
                特に開封後は、2〜3週間以内に使い切るのが理想的です。
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-7">
            <AccordionTrigger>返品・交換は可能ですか？</AccordionTrigger>
            <AccordionContent>
              <p>
                商品に不備があった場合は、商品到着後7日以内にご連絡ください。 迅速に対応させていただきます。
                ただし、お客様のご都合による返品・交換は、商品の性質上、原則としてお受けしておりません。
                何かご不明な点がございましたら、お問い合わせフォームよりご連絡ください。
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-8">
            <AccordionTrigger>定期購入は可能ですか？</AccordionTrigger>
            <AccordionContent>
              <p>
                はい、定期購入サービスをご用意しております。 1ヶ月、2ヶ月、3ヶ月の間隔からお選びいただけます。
                定期購入をご利用いただくと、通常価格から10%オフでご購入いただけます。 また、送料も無料となります。
                詳細は購入ページの「定期購入」タブをご確認ください。
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold">お問い合わせ</h2>
          <p className="text-muted-foreground">
            ご質問やご意見がございましたら、以下のフォームからお気軽にお問い合わせください。
          </p>

          {submitted ? (
            <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-6 text-center">
              <h3 className="font-bold text-lg mb-2">お問い合わせありがとうございます</h3>
              <p>内容を確認次第、担当者よりご連絡いたします。 通常、2営業日以内にご返信いたします。</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
              <div className="grid gap-2">
                <Label htmlFor="name">お名前</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">メールアドレス</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="message">お問い合わせ内容</Label>
                <Textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} rows={5} required />
              </div>
              <Button type="submit">送信する</Button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

