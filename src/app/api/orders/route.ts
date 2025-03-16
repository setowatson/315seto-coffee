import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { v4 as uuidv4 } from "uuid";

// 注文の型定義
export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

export interface Order {
  id: string;
  userId: string;
  userEmail: string;
  items: OrderItem[];
  totalAmount: number;
  status: "pending" | "processing" | "completed" | "cancelled";
  shippingAddress?: {
    name: string;
    postalCode: string;
    prefecture: string;
    city: string;
    address: string;
    phone: string;
  };
  createdAt: string;
  updatedAt: string;
}

// モック注文データベース（実際の実装ではCosmosDBを使用）
let orders: Order[] = [];

// 注文を作成するPOSTエンドポイント
export async function POST(request: Request) {
  try {
    // セッションからユーザー情報を取得
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json(
        { error: "認証が必要です" },
        { status: 401 }
      );
    }
    
    // リクエストボディから注文情報を取得
    const data = await request.json();
    
    if (!data.items || !Array.isArray(data.items) || data.items.length === 0) {
      return NextResponse.json(
        { error: "注文アイテムが必要です" },
        { status: 400 }
      );
    }
    
    // 注文の合計金額を計算
    const totalAmount = data.items.reduce(
      (sum: number, item: OrderItem) => sum + item.price * item.quantity,
      0
    );
    
    // 新しい注文を作成
    const newOrder: Order = {
      id: uuidv4(),
      userId: session.user.id,
      userEmail: session.user.email || "",
      items: data.items,
      totalAmount,
      status: "pending",
      shippingAddress: data.shippingAddress,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    // 注文をデータベースに保存（モック）
    orders.push(newOrder);
    
    // 実際の実装では以下のようにCosmosDBに保存
    // await upsertItem('orders', newOrder);
    
    return NextResponse.json(
      { success: true, order: newOrder },
      { status: 201 }
    );
  } catch (error) {
    console.error("注文作成エラー:", error);
    return NextResponse.json(
      { error: "注文の作成中にエラーが発生しました" },
      { status: 500 }
    );
  }
}

// ユーザーの注文履歴を取得するGETエンドポイント
export async function GET(request: Request) {
  try {
    // セッションからユーザー情報を取得
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json(
        { error: "認証が必要です" },
        { status: 401 }
      );
    }
    
    // URLからクエリパラメータを取得
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get("id");
    
    if (orderId) {
      // 特定の注文を取得
      const order = orders.find(
        (o) => o.id === orderId && o.userId === session.user!.id
      );
      
      if (!order) {
        return NextResponse.json(
          { error: "注文が見つかりません" },
          { status: 404 }
        );
      }
      
      return NextResponse.json({ order });
    }
    
    // ユーザーの全注文を取得
    const userOrders = orders.filter((o) => o.userId === session.user!.id);
    
    // 実際の実装では以下のようにCosmosDBから取得
    // const userOrders = await getItems<Order>(
    //   'orders',
    //   'SELECT * FROM c WHERE c.userId = @param0 ORDER BY c.createdAt DESC',
    //   [session.user.id]
    // );
    
    return NextResponse.json({ orders: userOrders });
  } catch (error) {
    console.error("注文取得エラー:", error);
    return NextResponse.json(
      { error: "注文の取得中にエラーが発生しました" },
      { status: 500 }
    );
  }
} 