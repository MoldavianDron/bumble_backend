import jwt from "jsonwebtoken";

import {Environment} from "~/constants";

const {JWT_SECRET} = Environment;

export type TokenPayload = {
  userId: string;
  telegramUserId: string
}

export const generateToken = (tokenPayload: TokenPayload) => jwt.sign(tokenPayload, JWT_SECRET);