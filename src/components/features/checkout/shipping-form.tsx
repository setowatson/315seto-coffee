'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ShippingInfo } from '@/shared/types/order';

interface ShippingFormProps {
  onSubmit: (data: ShippingInfo) => void;
}

export function ShippingForm({ onSubmit }: ShippingFormProps) {
  const [formData, setFormData] = useState<ShippingInfo>({
    fullName: '',
    postalCode: '',
    prefecture: '',
    city: '',
    address: '',
    building: '',
    phone: '',
    email: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ShippingInfo, string>>>({});

  const prefectures = [
    '北海道', '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県',
    '茨城県', '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県',
    '新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県', '岐阜県',
    '静岡県', '愛知県', '三重県', '滋賀県', '京都府', '大阪府', '兵庫県',
    '奈良県', '和歌山県', '鳥取県', '島根県', '岡山県', '広島県', '山口県',
    '徳島県', '香川県', '愛媛県', '高知県', '福岡県', '佐賀県', '長崎県',
    '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    // エラーをクリア
    if (errors[name as keyof ShippingInfo]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors: Partial<Record<keyof ShippingInfo, string>> = {};

    // 氏名のバリデーション
    if (!formData.fullName.trim()) {
      newErrors.fullName = '氏名を入力してください';
      isValid = false;
    }

    // 郵便番号のバリデーション
    const postalCodeRegex = /^\d{3}-?\d{4}$/;
    if (!postalCodeRegex.test(formData.postalCode)) {
      newErrors.postalCode = '正しい郵便番号を入力してください（例: 123-4567）';
      isValid = false;
    }

    // 都道府県のバリデーション
    if (!formData.prefecture) {
      newErrors.prefecture = '都道府県を選択してください';
      isValid = false;
    }

    // 市区町村のバリデーション
    if (!formData.city.trim()) {
      newErrors.city = '市区町村を入力してください';
      isValid = false;
    }

    // 番地のバリデーション
    if (!formData.address.trim()) {
      newErrors.address = '番地を入力してください';
      isValid = false;
    }

    // 電話番号のバリデーション
    const phoneRegex = /^0\d{1,4}-?\d{1,4}-?\d{4}$/;
    if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = '正しい電話番号を入力してください';
      isValid = false;
    }

    // メールアドレスのバリデーション
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = '正しいメールアドレスを入力してください';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <Link href="/cart" className="flex items-center text-amber-700 hover:text-amber-800">
          <ArrowLeft className="h-4 w-4 mr-2" />
          カートに戻る
        </Link>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-md p-4 mb-6">
        <p className="text-amber-800 font-medium flex items-center">
          <span className="bg-amber-100 p-1 rounded-full mr-2">
            <Star className="h-4 w-4 text-amber-600" />
          </span>
          期間限定！全国送料無料キャンペーン実施中
        </p>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-md p-4 mb-6">
        <p className="text-gray-700 font-medium">お支払い方法：PayPayのみ</p>
        <p className="text-gray-500 text-sm mt-1">
          現在、PayPay決済のみ対応しております。その他の決済方法は準備中です。
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="fullName" className="block text-sm font-medium">
              氏名 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="例: 瀬戸 太郎"
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm">{errors.fullName}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="postalCode" className="block text-sm font-medium">
              郵便番号 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="postalCode"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="例: 123-4567"
            />
            {errors.postalCode && (
              <p className="text-red-500 text-sm">{errors.postalCode}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="prefecture" className="block text-sm font-medium">
              都道府県 <span className="text-red-500">*</span>
            </label>
            <select
              id="prefecture"
              name="prefecture"
              value={formData.prefecture}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            >
              <option value="">選択してください</option>
              {prefectures.map((pref) => (
                <option key={pref} value={pref}>
                  {pref}
                </option>
              ))}
            </select>
            {errors.prefecture && (
              <p className="text-red-500 text-sm">{errors.prefecture}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="city" className="block text-sm font-medium">
              市区町村 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="例: 渋谷区"
            />
            {errors.city && (
              <p className="text-red-500 text-sm">{errors.city}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="address" className="block text-sm font-medium">
              番地 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="例: 神南1-2-3"
            />
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="building" className="block text-sm font-medium">
              建物名・部屋番号
            </label>
            <input
              type="text"
              id="building"
              name="building"
              value={formData.building}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="例: コーヒービル 101号室"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="phone" className="block text-sm font-medium">
              電話番号 <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="例: 090-1234-5678"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium">
              メールアドレス <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="例: example@email.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <Button type="submit" className="bg-amber-700 hover:bg-amber-800">
            支払い情報へ進む
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
} 