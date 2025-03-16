import React from 'react';
import Navbar from '@/components/layout/navbar/navbar';

export default function LegalPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">特定商取引法に基づく表記</h1>
              </div>
            </div>
          </div>
        </section>
        
        <section className="w-full py-12 md:py-24 lg:py-32 bg-amber-50">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl space-y-8">
              <div>
                <h2 className="text-xl font-semibold mb-4">販売業者</h2>
                <p>Seto Blend Coffee</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">運営責任者</h2>
                <p>Seto Shu</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">所在地</h2>
                <p>〒123-4567</p>
                <p>東京都〇〇区1-1-1</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">連絡先</h2>
                <p>メールアドレス: info@setoblendcoffee.com</p>
                <p>電話番号: 090-XXXX-XXXX</p>
                <p>受付時間: 平日 10:00～16:00</p>
              </div>

              <section>
                <h2 className="text-xl font-semibold mb-4">商品代金以外の必要料金</h2>
                <p>送料: 全国一律無料</p>
                <p>消費税: 商品価格に含む</p>
              </section>

              <div>
                <h2 className="text-xl font-semibold mb-4">お支払い方法</h2>
                <p>PayPay決済のみ</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">商品の引き渡し時期</h2>
                <p>ご注文確認後、5営業日以内に発送いたします。</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">返品・交換について</h2>
                <p>商品到着後7日以内に、未開封の商品に限り返品・交換を承ります。</p>
                <p>返品・交換にかかる送料はお客様のご負担となります。</p>
                <p>以下の場合は返品・交換をお受けできません：</p>
                <ul className="list-disc ml-6 mt-2">
                  <li>開封済みの商品</li>
                  <li>お客様のご都合による返品</li>
                  <li>商品到着後8日以上経過した商品</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
} 