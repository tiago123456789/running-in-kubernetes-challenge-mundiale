import express from "express";
import "./LoaderEnvironmentVariable";
import logger from "./Logger";

const app = express();

app.use((request, response) => {
    logger.error("is works")
    response.json({ msg: "Is work!!!" });

});

export default app;