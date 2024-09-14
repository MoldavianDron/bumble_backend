import {Queryable} from "~/db";

export type User = {
  id: string;
  telegram_user_id: string;
  access_key: string;
  created_at: Date;
};

export const findUser = async (db: Queryable, telegramUserId: string): Promise<User | undefined> => {
  const {
    rows: [user]
  } = await db.query<User>("SELECT * FROM users WHERE telegram_user_id = $1", [telegramUserId]);
  return user;
};

export const createUser = async (db: Queryable, telegramUserId: string, hashAccessKey: string): Promise<User> => {
  const {
    rows: [user]
  } = await db.query<User>("INSERT INTO users (telegram_user_id, access_key) VALUES ($1, $2) RETURNING *", [
    telegramUserId,
    hashAccessKey
  ]);

  return user;
};