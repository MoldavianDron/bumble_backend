import {APIErrorCode, BadRequest, Conflict} from "~/types";
import {v4} from "uuid";

import {Database, Queryable} from "~/db";
import {User, UserBalance} from "~/models";
import {HandlerBuilder} from "~/api/types";
import {TokenPayload} from "~/utils/generateToken";

type Dependencies = {
  db: Database;
  findUser: (db: Queryable, telegramUserId: string) => Promise<User | undefined>;
  generateHashedAccessKey: (accessKey: string) => Promise<string>;
  createUser: (db: Queryable, telegramUserId: string, hashAccessKey: string) => Promise<User>;
  createUserBalance: (db: Queryable, userId: string) => Promise<UserBalance>;
  generateToken: (tokenPayload: TokenPayload) => string;
  createTelegramLoginSession: (db: Queryable, userId: string, token: string) => Promise<void>;
};

type Params = {
  telegramUserId: string | undefined;
}

type ResponseBody = {
  token: string;
}

export const buildUserRegistrationHandler: HandlerBuilder<Dependencies, Params, ResponseBody> = ({
                                                                                                   db,
                                                                                                   findUser,
                                                                                                   generateHashedAccessKey,
                                                                                                   createUser,
                                                                                                   createUserBalance,
                                                                                                   generateToken,
                                                                                                   createTelegramLoginSession
                                                                                                 }) => async ({telegramUserId}) => {
  const client = await db.connect();
  await client.query("BEGIN");
  try {
    if (!telegramUserId) {
      throw new BadRequest(APIErrorCode.ERR_PARAMETER_MISSING, "Missing telegram user id parameter");
    }
    const user = await findUser(client, telegramUserId);
    if (!!user) {
      throw new Conflict(APIErrorCode.ERR_RESOURCE_EXISTS, "User already exists");
    }
    const accessKey = v4();
    const hashAccessKey = await generateHashedAccessKey(accessKey);

    const newUser = await createUser(client, telegramUserId, hashAccessKey);

    await createUserBalance(client, newUser.id);

    const tokenPayload = {
      userId: newUser.id,
      telegramUserId: newUser.telegram_user_id
    };
    const token = await generateToken(tokenPayload);
    await createTelegramLoginSession(client, newUser.id, token);

    await client.query("COMMIT");

    return {
      token
    };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};