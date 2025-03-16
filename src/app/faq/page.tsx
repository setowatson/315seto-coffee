'use client';

import { useState } from "react";
import Link from "next/link";
import { Coffee, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Navbar from "@/components/layout/navbar/navbar";

export default function FAQPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">よくある質問</h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  SETO Blend Coffeeに関するよくある質問をまとめました。
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <section className="w-full py-12 md:py-24 lg:py-32 bg-amber-50">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-lg font-medium">
                    SETO Blend Coffeeはどのような特徴がありますか？
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    SETO Blend Coffeeは、コーヒーの奥深い世界への「最初の一歩」をテーマにした特別なブレンドです。厳選された2種類のシングルオリジンを絶妙な配合でブレンドし、深煎りと浅煎りの絶妙なバランスを実現しました。王道のコーヒーの味が好きな方にとって、コーヒーの奥深い世界へ踏み出す「最初の一歩目」となるような、特別なコーヒーです。
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-lg font-medium">
                    コーヒー豆の挽き方は選べますか？
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    はい、選べます。「豆のまま」「粗挽き（フレンチプレス向け）」「中挽き（ペーパードリップ向け）」「細挽き（エスプレッソ向け）」の4種類からお選びいただけます。ご自宅の抽出器具に合わせてお選びください。
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-lg font-medium">
                    コーヒー豆の鮮度はどのくらい保たれますか？
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    コーヒー豆は焙煎後、約1ヶ月間が最も美味しく飲める期間です。SETO Blend Coffeeでは、注文を受けてから焙煎するため、最も新鮮な状態でお届けしています。開封後は、密閉容器に入れて冷暗所で保存することをおすすめします。
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-lg font-medium">
                    配送にはどのくらいの日数がかかりますか？
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    ご注文から発送までに1〜2営業日、発送から到着までに1〜3営業日かかります。合計で2〜5営業日程度でのお届けとなります。なお、繁忙期や天候不良などにより、配送が遅れる場合がございます。
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-5">
                  <AccordionTrigger className="text-lg font-medium">
                    返品・交換は可能ですか？
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    商品の性質上、お客様のご都合による返品・交換はお受けしておりません。ただし、商品に不備があった場合は、商品到着後7日以内にご連絡ください。代替品の発送または返金にて対応させていただきます。
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-6">
                  <AccordionTrigger className="text-lg font-medium">
                    定期購入はできますか？
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    はい、定期購入サービスをご用意しています。2週間ごと、1ヶ月ごと、2ヶ月ごとの3つのコースからお選びいただけます。定期購入の場合、通常価格から10%割引でご提供しています。詳細は購入ページをご確認ください。
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-7">
                  <AccordionTrigger className="text-lg font-medium">
                    ギフト包装は可能ですか？
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    はい、ギフト包装サービスをご用意しています。購入時に「ギフト包装」オプションをお選びください。メッセージカードの添付も可能です。ギフト包装は300円（税込）の追加料金がかかります。
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-8">
                  <AccordionTrigger className="text-lg font-medium">
                    支払い方法は何がありますか？
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    クレジットカード（VISA、MasterCard、JCB、American Express）、PayPal、銀行振込、コンビニ決済に対応しています。銀行振込とコンビニ決済の場合、入金確認後の発送となります。
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>
        
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl">
              <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">お問い合わせ</h2>
                  <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    ご質問やお問い合わせは、以下のSNSからお気軽にどうぞ。
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col items-center justify-center space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-md">
                  <a 
                    href="https://rogue-boat-75a.notion.site/Seto-s-Diary-1aacf2b416868011bcbbf441df15a054" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 p-4 rounded-md bg-amber-100 text-amber-800 hover:bg-amber-200 transition-colors"
                  >
                    <ExternalLink className="h-5 w-5" />
                    <span className="font-medium">ブログ</span>
                  </a>
                  <a 
                    href="https://www.instagram.com/shu_no_kristoff?igsh=MWJpdmk4eHAyNGZwNA%3D%3D&utm_source=qr" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 p-4 rounded-md bg-amber-100 text-amber-800 hover:bg-amber-200 transition-colors"
                  >
                    <ExternalLink className="h-5 w-5" />
                    <span className="font-medium">Instagram</span>
                  </a>
                </div>
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
  );
} 