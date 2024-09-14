import {Router} from "express";

import {registrationRouter} from "~/api/registration/registrationRouter";

const router = Router();

router.use(registrationRouter);

export {router};