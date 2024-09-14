import {Queryable} from "~/db";

export type TelegramLoginSession = {
  id: string;
  user_id: string;
  session_token: string;
}

export const createTelegramLoginSession = async (db: Queryable, userId: string, token: string): Promise<void> => {
  await db.query<TelegramLoginSession>(
    "INSERT INTO telegram_login_sessions (user_id, session_token) VALUES ($1, $2)",
    [userId, token]
  )
};