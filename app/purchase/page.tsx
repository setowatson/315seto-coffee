"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Coffee, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"

export default function PurchasePage() {
  const [isGift, setIsGift] = useState(false)
  const [selectedGrams, setSelectedGrams] = useState("100")
  const [selectedForm, setSelectedForm] = useState("beans")
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const calculatePrice = () => {
    const basePrice = 1500
    const gramMultiplier = Number.parseInt(selectedGrams) / 100
    let formAdditional = 0

    if (selectedForm === "ground") formAdditional = 100
    if (selectedForm === "drip") formAdditional = 300

    return (basePrice * gramMultiplier + formAdditional).toFixed(0)
  }

  return (
    <div className="container py-10">
      <Link href="/" className="inline-flex items-center gap-1 text-sm font-medium hover:underline mb-6">
        <ArrowLeft className="h-4 w-4" />
        ホームに戻る
      </Link>

      <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-start">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">SETO Blend Coffee</h1>
            <p className="mt-4 text-muted-foreground">
              コーヒーの奥深い世界への「最初の一歩」をテーマにした特別なブレンド。
              2種類のシングルオリジンを絶妙な配合でブレンドし、深煎りと浅煎りの絶妙なバランスをお楽しみいただけます。
            </p>
          </div>

          <div className="aspect-square overflow-hidden rounded-lg">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/seto-blend-package.jpg-OhofKnAiE8vFn76uYxTswjYjQ8MJjY.jpeg"
              width={600}
              height={600}
              alt="SETO Blend Coffee"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="aspect-square overflow-hidden rounded-lg">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/coffee-beans-closeup.jpg-e2OU0hiJtstZjfv2CecQd8NwK24i3p.jpeg"
                width={300}
                height={300}
                alt="コーヒー豆のアップ"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="aspect-square overflow-hidden rounded-lg">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/coffee-cup.jpg-Q4OFD1D4J8WIKcuFfptOK7taY91spr.jpeg"
                width={300}
                height={300}
                alt="コーヒーカップ"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>SETO Blend Coffee</CardTitle>
              <CardDescription>毎月変わる味わいをお楽しみください</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="grams">グラム数を選択</Label>
                <Select value={selectedGrams} onValueChange={setSelectedGrams}>
                  <SelectTrigger id="grams">
                    <SelectValue placeholder="グラム数を選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="100">100g</SelectItem>
                    <SelectItem value="200">200g</SelectItem>
                    <SelectItem value="300">300g</SelectItem>
                    <SelectItem value="400">400g</SelectItem>
                    <SelectItem value="500">500g</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>コーヒーの状態</Label>
                <RadioGroup value={selectedForm} onValueChange={setSelectedForm} className="grid grid-cols-3 gap-4">
                  <div>
                    <RadioGroupItem value="beans" id="beans" className="peer sr-only" />
                    <Label
                      htmlFor="beans"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <Coffee className="mb-3 h-6 w-6" />
                      豆のまま
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="ground" id="ground" className="peer sr-only" />
                    <Label
                      htmlFor="ground"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
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
                        className="mb-3 h-6 w-6"
                      >
                        <path d="M2 12h10" />
                        <path d="M9 4v16" />
                        <path d="M3 9v6" />
                        <path d="M13 4h7a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-7" />
                      </svg>
                      挽いた状態
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="drip" id="drip" className="peer sr-only" />
                    <Label
                      htmlFor="drip"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
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
                        className="mb-3 h-6 w-6"
                      >
                        <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
                        <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
                        <line x1="6" x2="6" y1="2" y2="4" />
                        <line x1="10" x2="10" y1="2" y2="4" />
                        <line x1="14" x2="14" y1="2" y2="4" />
                      </svg>
                      ドリップバッグ
                      <br />
                      <span className="text-xs text-muted-foreground">(5個入り)</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="gift" checked={isGift} onCheckedChange={(checked) => setIsGift(checked as boolean)} />
                <label
                  htmlFor="gift"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  ギフト包装する
                </label>
              </div>

              {isGift && (
                <div className="space-y-4 border rounded-lg p-4">
                  <div className="space-y-2">
                    <Label htmlFor="message">ギフトメッセージ</Label>
                    <Textarea id="message" placeholder="メッセージを入力してください" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="image">画像をアップロード（包装紙に印刷されます）</Label>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <Label
                        htmlFor="image"
                        className="cursor-pointer flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg hover:bg-muted"
                      >
                        {uploadedImage ? (
                          <Image
                            src={uploadedImage || "/placeholder.svg"}
                            width={100}
                            height={100}
                            alt="アップロードされた画像"
                            className="h-full w-full object-contain"
                          />
                        ) : (
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="h-6 w-6 mb-2" />
                            <p className="mb-2 text-sm text-muted-foreground">クリックして画像をアップロード</p>
                          </div>
                        )}
                      </Label>
                      <Input id="image" type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex flex-col items-start space-y-4">
              <div className="text-2xl font-bold">¥{calculatePrice()}</div>
              <Button className="w-full">購入手続きへ進む</Button>
            </CardFooter>
          </Card>

          <Tabs defaultValue="shipping">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="shipping">配送情報</TabsTrigger>
              <TabsTrigger value="payment">お支払い</TabsTrigger>
              <TabsTrigger value="details">商品詳細</TabsTrigger>
            </TabsList>
            <TabsContent value="shipping" className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium">配送について</h3>
                <p className="text-sm text-muted-foreground">ご注文確認後、1-3営業日以内に発送いたします。</p>
                <p className="text-sm text-muted-foreground">
                  全国一律送料500円（税込）。5,000円以上のご購入で送料無料。
                </p>
              </div>
            </TabsContent>
            <TabsContent value="payment" className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium">お支払い方法</h3>
                <p className="text-sm text-muted-foreground">
                  クレジットカード（VISA、Mastercard、American Express、JCB）
                </p>
                <p className="text-sm text-muted-foreground">銀行振込、コンビニ決済もご利用いただけます。</p>
              </div>
            </TabsContent>
            <TabsContent value="details" className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium">商品詳細</h3>
                <p className="text-sm text-muted-foreground">
                  原材料：コーヒー豆（生豆生産国：エチオピア、コロンビア）
                </p>
                <p className="text-sm text-muted-foreground">
                  内容量：100g/200g/300g/400g/500g（豆・粉）、5個入り（ドリップバッグ）
                </p>
                <p className="text-sm text-muted-foreground">賞味期限：製造日より3ヶ月（未開封時）</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

