import express from "express";
import bodyParser from "body-parser";
import compression from "compression";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./Swagger";
import routesApp from "../routes";
import "./LoaderEnvironmentVariable";
import logger from "./Logger";

const app = express();

/**
 * @description Configuration middleware make compression response.
 */
app.use(compression());

/**
 * @description Configuration middleware make parse datas to json.
 */
app.use(bodyParser.json());

/**
 * @description Setting route with documentation swagger.
 */
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @description Loading application routes.
 */
routesApp(app);

export default app;