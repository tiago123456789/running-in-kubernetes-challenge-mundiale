import express from "express";
import bodyParser from "body-parser";
import routesApp from "../routes";
import "./LoaderEnvironmentVariable";
import logger from "./Logger";

const app = express();

/**
 * @description Configuration middleware make parse datas to json.
 */
app.use(bodyParser.json());

/**
 * @description Loading application routes.
 */
routesApp(app);

export default app;