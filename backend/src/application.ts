import * as express from "express";
import * as eventController from "./controllers/event-controller";

import * as bodyParser from "body-parser";
import "reflect-metadata";
import {createConnection} from "typeorm";
import * as appConfig from "./common/app-config";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/GetAllEvents", eventController.getAllEvents);

createConnection(appConfig.dbOptions).then(async (_) => {
    console.log("Connected to DB");

}).catch(error => console.log("TypeORM connection error: ", error));

export default app;
