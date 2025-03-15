import { CosmosClient, Container, Database } from '@azure/cosmos';

// Cosmos DB接続設定
const endpoint = process.env.COSMOS_ENDPOINT || '';
const key = process.env.COSMOS_KEY || '';
const databaseId = process.env.COSMOS_DATABASE_ID || '';

// Cosmos Clientの初期化
const client = new CosmosClient({ endpoint, key });

// データベースとコンテナの参照を保持
let database: Database;
let containers: { [key: string]: Container } = {};

/**
 * データベースとコンテナを初期化する
 */
export async function initializeCosmosDB() {
  try {
    // データベースの取得または作成
    const { database: db } = await client.databases.createIfNotExists({ id: databaseId });
    database = db;
    console.log(`Database initialized: ${database.id}`);
    
    return database;
  } catch (error) {
    console.error('Failed to initialize Cosmos DB:', error);
    throw error;
  }
}

/**
 * コンテナを取得または作成する
 */
export async function getContainer(containerId: string, partitionKey: string = '/id') {
  try {
    if (!database) {
      await initializeCosmosDB();
    }
    
    if (!containers[containerId]) {
      const { container } = await database.containers.createIfNotExists({
        id: containerId,
        partitionKey: { paths: [partitionKey] }
      });
      containers[containerId] = container;
      console.log(`Container initialized: ${container.id}`);
    }
    
    return containers[containerId];
  } catch (error) {
    console.error(`Failed to get container ${containerId}:`, error);
    throw error;
  }
}

/**
 * アイテムを取得する
 */
export async function getItems<T>(containerId: string, query: string, parameters: any[] = []) {
  try {
    const container = await getContainer(containerId);
    
    const querySpec = {
      query,
      parameters: parameters.map((param, index) => ({
        name: `@param${index}`,
        value: param
      }))
    };
    
    const { resources } = await container.items.query(querySpec).fetchAll();
    return resources as T[];
  } catch (error) {
    console.error('Failed to query items:', error);
    throw error;
  }
}

/**
 * 単一のアイテムを取得する
 */
export async function getItem<T>(containerId: string, id: string, partitionKey?: string) {
  try {
    const container = await getContainer(containerId);
    const { resource } = await container.item(id, partitionKey || id).read();
    return resource as T;
  } catch (error) {
    console.error('Failed to get item:', error);
    throw error;
  }
}

/**
 * アイテムを作成または更新する
 */
export async function upsertItem<T>(containerId: string, item: T) {
  try {
    const container = await getContainer(containerId);
    const { resource } = await container.items.upsert(item);
    return resource as T;
  } catch (error) {
    console.error('Failed to upsert item:', error);
    throw error;
  }
}

/**
 * アイテムを削除する
 */
export async function deleteItem(containerId: string, id: string, partitionKey?: string) {
  try {
    const container = await getContainer(containerId);
    await container.item(id, partitionKey || id).delete();
  } catch (error) {
    console.error('Failed to delete item:', error);
    throw error;
  }
}

// クライアントをエクスポート
export { client };