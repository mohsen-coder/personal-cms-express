import { Router } from "express";
import { RegisterGet } from "../middlewares/RegisterGet";
import { RegisterPost } from "../middlewares/RegisterPost";
import { RegisterPostValidation } from "../middlewares/RegisterPostValidation";

const register = Router()

register.get('/register', RegisterGet)

register.post('/register', RegisterPostValidation, RegisterPost)

export {register as registerRouter}