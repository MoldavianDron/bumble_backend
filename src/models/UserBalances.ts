import {Queryable} from "~/db";

export type UserBalance = {
  id: string;
  user_id: string;
  balance: number;
}

export const createUserBalance = async (db: Queryable, userId: string): Promise<UserBalance> => {
  const {
    rows: [userBalance]
  } = await db.query<UserBalance>(
    "INSERT INTO user_balances (user_id, amount) VALUES ($1, $2) RETURNING *",
    [userId, 0]
  );

  return userBalance
};