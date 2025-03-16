'use client';

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Coffee, Thermometer, Clock, Droplet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/layout/navbar/navbar";

export default function BrewingPage() {
  const [activeTab, setActiveTab] = useState("drip-bag");
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">淹れ方ガイド</h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  SETO Blend Coffeeの美味しい淹れ方をご紹介します。あなたに合った方法で、最高の一杯をお楽しみください。
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <section className="w-full py-12 md:py-24 lg:py-32 bg-amber-50">
          <div className="container px-4 md:px-6">
            <Tabs defaultValue="drip-bag" className="w-full" onValueChange={setActiveTab}>
              <div className="flex justify-center mb-8">
                <TabsList className="grid w-full max-w-md grid-cols-3">
                  <TabsTrigger value="drip-bag">ドリップバッグ</TabsTrigger>
                  <TabsTrigger value="dripper">ドリッパー</TabsTrigger>
                  <TabsTrigger value="beans">豆から淹れる</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="drip-bag" className="mt-6">
                <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
                  <div className="space-y-4">
                    <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">ドリップバッグで手軽に</h2>
                    <p className="text-gray-600 md:text-lg/relaxed">
                      ドリップバッグは、手軽に美味しいコーヒーを楽しむための最も簡単な方法です。特別な道具は必要なく、お湯さえあれば、どこでも本格的な味わいを楽しめます。
                    </p>
                    
                    <div className="space-y-4 mt-6">
                      <h3 className="text-xl font-semibold">手順</h3>
                      <ol className="space-y-4">
                        <li className="flex items-start">
                          <span className="bg-amber-100 text-amber-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">1</span>
                          <div>
                            <p className="font-medium">パッケージを開ける</p>
                            <p className="text-sm text-gray-600">ドリップバッグを取り出し、耳を広げます。</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="bg-amber-100 text-amber-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">2</span>
                          <div>
                            <p className="font-medium">カップにセット</p>
                            <p className="text-sm text-gray-600">耳をカップの縁にかけて固定します。</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="bg-amber-100 text-amber-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">3</span>
                          <div>
                            <p className="font-medium">お湯を注ぐ</p>
                            <p className="text-sm text-gray-600">90℃程度のお湯を少量注ぎ、30秒蒸らします。その後、残りのお湯をゆっくり注ぎます。</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="bg-amber-100 text-amber-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">4</span>
                          <div>
                            <p className="font-medium">ドリップバッグを取り外す</p>
                            <p className="text-sm text-gray-600">すべてのお湯が落ちたら、ドリップバッグを取り外します。</p>
                          </div>
                        </li>
                      </ol>
                    </div>
                  </div>
                  <Image
                    src="/images/brewing-drip-bag.jpeg"
                    width={600}
                    height={400}
                    alt="ドリップバッグのイメージ"
                    className="mx-auto aspect-video overflow-hidden rounded-xl object-cover"
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="dripper" className="mt-6">
                <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
                  <div className="space-y-4">
                    <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">ドリッパーで本格的に</h2>
                    <p className="text-gray-600 md:text-lg/relaxed">
                      ドリッパーを使った抽出は、コーヒーの風味をより引き出すことができる方法です。少し手間はかかりますが、その分だけ深い味わいを楽しむことができます。
                    </p>
                    
                    <div className="space-y-4 mt-6">
                      <h3 className="text-xl font-semibold">必要なもの</h3>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <span className="bg-amber-100 text-amber-800 rounded-full w-2 h-2 mr-3"></span>
                          <p>ドリッパー（円錐形がおすすめ）</p>
                        </li>
                        <li className="flex items-center">
                          <span className="bg-amber-100 text-amber-800 rounded-full w-2 h-2 mr-3"></span>
                          <p>ペーパーフィルター</p>
                        </li>
                        <li className="flex items-center">
                          <span className="bg-amber-100 text-amber-800 rounded-full w-2 h-2 mr-3"></span>
                          <p>コーヒー粉（中挽き）</p>
                        </li>
                        <li className="flex items-center">
                          <span className="bg-amber-100 text-amber-800 rounded-full w-2 h-2 mr-3"></span>
                          <p>お湯（90℃前後）</p>
                        </li>
                      </ul>
                      
                      <h3 className="text-xl font-semibold mt-6">手順</h3>
                      <ol className="space-y-4">
                        <li className="flex items-start">
                          <span className="bg-amber-100 text-amber-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">1</span>
                          <div>
                            <p className="font-medium">ペーパーフィルターをセット</p>
                            <p className="text-sm text-gray-600">ドリッパーにペーパーフィルターをセットし、お湯で軽く濡らしておきます。</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="bg-amber-100 text-amber-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">2</span>
                          <div>
                            <p className="font-medium">コーヒー粉を入れる</p>
                            <p className="text-sm text-gray-600">カップ1杯あたり10〜12gのコーヒー粉を入れ、表面を平らにします。</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="bg-amber-100 text-amber-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">3</span>
                          <div>
                            <p className="font-medium">蒸らし</p>
                            <p className="text-sm text-gray-600">コーヒー粉が湿る程度のお湯を注ぎ、30秒ほど蒸らします。</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="bg-amber-100 text-amber-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">4</span>
                          <div>
                            <p className="font-medium">抽出</p>
                            <p className="text-sm text-gray-600">中心から外側に向かって、円を描くようにゆっくりとお湯を注ぎます。</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="bg-amber-100 text-amber-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">5</span>
                          <div>
                            <p className="font-medium">完成</p>
                            <p className="text-sm text-gray-600">すべてのお湯が落ちたら完成です。抽出時間は全体で2〜3分を目安にしてください。</p>
                          </div>
                        </li>
                      </ol>
                    </div>
                  </div>
                  <Image
                    src="/images/brewing-dripper.jpeg"
                    width={600}
                    height={400}
                    alt="ドリッパーのイメージ"
                    className="mx-auto aspect-video overflow-hidden rounded-xl object-cover"
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="beans" className="mt-6">
                <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
                  <div className="space-y-4">
                    <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">豆から淹れる</h2>
                    <p className="text-gray-600 md:text-lg/relaxed">
                      コーヒー豆から挽きたてのコーヒーを淹れることで、最も新鮮で香り高い一杯を楽しむことができます。少し手間はかかりますが、その香りと味わいは格別です。
                    </p>
                    
                    <div className="space-y-4 mt-6">
                      <h3 className="text-xl font-semibold">必要なもの</h3>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <span className="bg-amber-100 text-amber-800 rounded-full w-2 h-2 mr-3"></span>
                          <p>コーヒーミル</p>
                        </li>
                        <li className="flex items-center">
                          <span className="bg-amber-100 text-amber-800 rounded-full w-2 h-2 mr-3"></span>
                          <p>ドリッパー</p>
                        </li>
                        <li className="flex items-center">
                          <span className="bg-amber-100 text-amber-800 rounded-full w-2 h-2 mr-3"></span>
                          <p>ペーパーフィルター</p>
                        </li>
                        <li className="flex items-center">
                          <span className="bg-amber-100 text-amber-800 rounded-full w-2 h-2 mr-3"></span>
                          <p>コーヒー豆</p>
                        </li>
                        <li className="flex items-center">
                          <span className="bg-amber-100 text-amber-800 rounded-full w-2 h-2 mr-3"></span>
                          <p>お湯（90℃前後）</p>
                        </li>
                      </ul>
                      
                      <h3 className="text-xl font-semibold mt-6">手順</h3>
                      <ol className="space-y-4">
                        <li className="flex items-start">
                          <span className="bg-amber-100 text-amber-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">1</span>
                          <div>
                            <p className="font-medium">豆を挽く</p>
                            <p className="text-sm text-gray-600">カップ1杯あたり10〜12gのコーヒー豆を中挽きに挽きます。</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="bg-amber-100 text-amber-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">2</span>
                          <div>
                            <p className="font-medium">ドリッパーの準備</p>
                            <p className="text-sm text-gray-600">ドリッパーにペーパーフィルターをセットし、お湯で軽く濡らしておきます。</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="bg-amber-100 text-amber-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">3</span>
                          <div>
                            <p className="font-medium">コーヒー粉を入れる</p>
                            <p className="text-sm text-gray-600">挽いたコーヒー粉をフィルターに入れ、表面を平らにします。</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="bg-amber-100 text-amber-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">4</span>
                          <div>
                            <p className="font-medium">蒸らし</p>
                            <p className="text-sm text-gray-600">コーヒー粉が湿る程度のお湯を注ぎ、30秒ほど蒸らします。</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="bg-amber-100 text-amber-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">5</span>
                          <div>
                            <p className="font-medium">抽出</p>
                            <p className="text-sm text-gray-600">中心から外側に向かって、円を描くようにゆっくりとお湯を注ぎます。</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="bg-amber-100 text-amber-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">6</span>
                          <div>
                            <p className="font-medium">完成</p>
                            <p className="text-sm text-gray-600">すべてのお湯が落ちたら完成です。抽出時間は全体で2〜3分を目安にしてください。</p>
                          </div>
                        </li>
                      </ol>
                    </div>
                  </div>
                  <Image
                    src="/images/brewing-grinder.jpeg"
                    width={600}
                    height={400}
                    alt="コーヒー豆とミルのイメージ"
                    className="mx-auto aspect-video overflow-hidden rounded-xl object-cover"
                  />
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
              <Card>
                <CardHeader>
                  <Thermometer className="h-6 w-6 text-amber-700 mb-2" />
                  <CardTitle>お湯の温度</CardTitle>
                  <CardDescription>最適な抽出温度</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    コーヒーの抽出に最適な温度は90℃前後です。沸騰したお湯を30秒ほど置いてから使用するのがおすすめです。
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <Clock className="h-6 w-6 text-amber-700 mb-2" />
                  <CardTitle>抽出時間</CardTitle>
                  <CardDescription>美味しさの決め手</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    抽出時間は全体で2〜3分を目安にしてください。短すぎると酸味が強く、長すぎると苦味が強くなります。
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <Droplet className="h-6 w-6 text-amber-700 mb-2" />
                  <CardTitle>挽き方</CardTitle>
                  <CardDescription>抽出方法による違い</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    ドリップには中挽き、フレンチプレスには粗挽き、エスプレッソには細挽きが適しています。
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <div className="flex justify-center mt-16">
              <Button asChild className="bg-amber-700 hover:bg-amber-800">
                <Link href="/purchase">
                  コーヒーを購入する
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
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