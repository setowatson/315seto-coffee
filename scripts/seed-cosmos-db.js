// Cosmos DBに初期データを投入するスクリプト
require('dotenv').config({ path: '.env.local' });
const { CosmosClient } = require('@azure/cosmos');

// Cosmos DB接続設定
const endpoint = process.env.COSMOS_ENDPOINT;
const key = process.env.COSMOS_KEY;
const databaseId = process.env.COSMOS_DATABASE_ID;
const containerId = 'products';

// 初期データ
const products = [
  {
    id: '1',
    name: 'SETO Blend Coffee - Light Roast',
    description: '軽やかな酸味と華やかな香りが特徴の浅煎りブレンド',
    price: 1200,
    imageUrl: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/coffee-beans.jpg-wXSniSHcICfSzPZnLfr8RgRn2CSnPg.jpeg',
    stock: 50,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'SETO Blend Coffee - Medium Roast',
    description: 'バランスの取れた味わいと豊かなコクが楽しめる中煎りブレンド',
    price: 1300,
    imageUrl: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/coffee-beans.jpg-wXSniSHcICfSzPZnLfr8RgRn2CSnPg.jpeg',
    stock: 45,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '3',
    name: 'SETO Blend Coffee - Dark Roast',
    description: '深いコクと苦味が特徴の深煎りブレンド',
    price: 1400,
    imageUrl: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/coffee-beans.jpg-wXSniSHcICfSzPZnLfr8RgRn2CSnPg.jpeg',
    stock: 40,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '4',
    name: 'SETO Single Origin - Ethiopia',
    description: 'フローラルな香りとベリーのような風味が特徴のエチオピア産シングルオリジン',
    price: 1600,
    imageUrl: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/coffee-beans.jpg-wXSniSHcICfSzPZnLfr8RgRn2CSnPg.jpeg',
    stock: 30,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '5',
    name: 'SETO Single Origin - Colombia',
    description: 'ナッツのような風味とキャラメルのような甘さが特徴のコロンビア産シングルオリジン',
    price: 1500,
    imageUrl: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/coffee-beans.jpg-wXSniSHcICfSzPZnLfr8RgRn2CSnPg.jpeg',
    stock: 35,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

async function seedDatabase() {
  try {
    console.log('Connecting to Cosmos DB...');
    const client = new CosmosClient({ endpoint, key });
    
    console.log(`Creating database: ${databaseId}`);
    const { database } = await client.databases.createIfNotExists({ id: databaseId });
    
    console.log(`Creating container: ${containerId}`);
    const { container } = await database.containers.createIfNotExists({
      id: containerId,
      partitionKey: { paths: ['/id'] }
    });
    
    console.log('Inserting products...');
    for (const product of products) {
      try {
        const { resource } = await container.items.upsert(product);
        console.log(`Inserted product: ${resource.id}`);
      } catch (error) {
        console.error(`Failed to insert product ${product.id}:`, error);
      }
    }
    
    console.log('Seed completed successfully');
  } catch (error) {
    console.error('Failed to seed database:', error);
  }
}

// スクリプトを実行
seedDatabase(); 