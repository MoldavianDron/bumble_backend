import "dotenv/config";

import express from "express";
import cors from "cors";

import {router} from "~/api/router";
import {errorHandlingMiddleware} from "~/middleware";

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api', router);
app.use(errorHandlingMiddleware);

export {app};
