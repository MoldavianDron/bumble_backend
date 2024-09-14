import { Pool, Client, PoolClient, PoolConfig, types } from "pg";

import { Environment } from "~/constants";

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT} = Environment;

types.setTypeParser(types.builtins.NUMERIC, (value) => parseFloat(value));

export type Database = Pool;
export type DatabaseClient = PoolClient;

export type QueryOptions = {
  lock?: "FOR KEY SHARE" | "FOR SHARE" | "FOR NO KEY UPDATE" | "FOR UPDATE";
};

export type Queryable = {
  query: typeof Client.prototype.query;
};

const poolConfig: PoolConfig = {
  user: DB_USER,
  password: DB_PASSWORD,
  host: DB_HOST,
  database: DB_NAME,
  port: Number(DB_PORT),
  max: Environment.MAX_DB_POOL_SIZE,
  min: Environment.MIN_DB_POOL_SIZE,
  connectionTimeoutMillis: 5000,
};

export const db: Database = new Pool(poolConfig);
