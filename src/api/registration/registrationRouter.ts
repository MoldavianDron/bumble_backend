import {Router} from "express";
import {registrationController} from "~/api/registration/registrationController";

const registrationRouter = Router();

registrationRouter.post("/registration", registrationController);

export {registrationRouter};
