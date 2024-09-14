import {NextFunction, Request, Response} from "express";
import {userRegistrationHandler} from "~/api/registration/userRegistrationHandler";

export const registrationController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {telegramUserId} = req.body;
    const data = await userRegistrationHandler({telegramUserId});
    res.status(201).json({data});
  } catch (err) {
    next(err);
  }
};