import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold text-lg mb-4">Seto Blend Coffee</h3>
            <p className="text-gray-600 text-sm">
              コーヒーの奥深い世界への「最初の一歩」をテーマにした特別なブレンドをお届けします。
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">リンク</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/purchase" className="text-gray-600 hover:text-amber-700">
                  商品一覧
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-600 hover:text-amber-700">
                  よくある質問
                </Link>
              </li>
              <li>
                <Link href="/legal" className="text-gray-600 hover:text-amber-700">
                  特定商取引法に基づく表記
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">お問い合わせ</h3>
            <p className="text-gray-600 text-sm">
              メール: info@setoblendcoffee.com<br />
              営業時間: 平日 10:00～17:00
            </p>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 text-center text-gray-600 text-sm">
          <p>&copy; 2024 Seto Blend Coffee. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 