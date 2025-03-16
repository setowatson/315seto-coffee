import React from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ShippingInfo } from '@/shared/types/order';

interface ShippingFormProps {
  onSubmit: (data: ShippingInfo) => void;
  defaultValues?: Partial<ShippingInfo>;
}

export function ShippingForm({ onSubmit, defaultValues }: ShippingFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<ShippingInfo>({
    defaultValues: defaultValues || {},
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="fullName">お名前</Label>
          <Input
            id="fullName"
            {...register('fullName', { required: '名前を入力してください' })}
            placeholder="山田 太郎"
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="postalCode">郵便番号</Label>
          <Input
            id="postalCode"
            {...register('postalCode', { required: '郵便番号を入力してください' })}
            placeholder="123-4567"
          />
          {errors.postalCode && (
            <p className="text-red-500 text-sm mt-1">{errors.postalCode.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="prefecture">都道府県</Label>
          <Input
            id="prefecture"
            {...register('prefecture', { required: '都道府県を入力してください' })}
            placeholder="東京都"
          />
          {errors.prefecture && (
            <p className="text-red-500 text-sm mt-1">{errors.prefecture.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="city">市区町村</Label>
          <Input
            id="city"
            {...register('city', { required: '市区町村を入力してください' })}
            placeholder="渋谷区"
          />
          {errors.city && (
            <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="address">番地</Label>
          <Input
            id="address"
            {...register('address', { required: '番地を入力してください' })}
            placeholder="1-2-3"
          />
          {errors.address && (
            <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="building">建物名・部屋番号</Label>
          <Input
            id="building"
            {...register('building')}
            placeholder="○○マンション101"
          />
        </div>

        <div>
          <Label htmlFor="phone">電話番号</Label>
          <Input
            id="phone"
            {...register('phone', { required: '電話番号を入力してください' })}
            placeholder="090-1234-5678"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="email">メールアドレス</Label>
          <Input
            id="email"
            type="email"
            {...register('email', {
              required: 'メールアドレスを入力してください',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: '有効なメールアドレスを入力してください',
              },
            })}
            placeholder="example@example.com"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
      </div>

      <Button type="submit" className="w-full">
        配送情報を保存
      </Button>
    </form>
  );
} 