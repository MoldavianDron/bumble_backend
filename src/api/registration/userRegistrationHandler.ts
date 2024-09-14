import {db} from "~/db";
import {createTelegramLoginSession, createUser, createUserBalance, findUser} from "~/models";
import {generateToken, generateHashedAccessKey} from "~/utils";

import {buildUserRegistrationHandler} from "./buildUserRegistrationHandler";

export const userRegistrationHandler = buildUserRegistrationHandler({
  db,
  findUser,
  generateHashedAccessKey,
  createUser,
  createUserBalance,
  generateToken,
  createTelegramLoginSession
});