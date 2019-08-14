import * as express from "express";
import * as cors from "cors";

import {careRecipientController} from "./controllers/care-recipient-controller";

const app = express();

app.use(cors());
app.use(careRecipientController);

export default app;
