import * as express from "express";
import {careRecipientController} from "./controllers/care-recipient-controller";

const app = express();

app.use(careRecipientController);

export default app;
