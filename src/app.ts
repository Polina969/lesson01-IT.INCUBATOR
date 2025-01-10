import express, { NextFunction, Request, Response } from "express";
import { db } from "./db/db";
import { getVideoRouter } from "./router/video";

export const app = express();
export const PORT = process.env.PORT || 4010;
const jsonBodyMiddleware = express.json();
app.use(jsonBodyMiddleware);

app.use(getVideoRouter(db));
