import { Router } from "express";
import { IndexGet } from "../middlewares/IndexGet";

const index = Router()

index.get('/', IndexGet)

export { index as indexRouter }