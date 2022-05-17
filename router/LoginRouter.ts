import { Router } from "express";
import { LoginGet } from "../middlewares/LoginGet";
import { LoginPost } from "../middlewares/LoginPost";
import { LoginPostValidation } from "../middlewares/LoginPostValidation";

const login = Router()

login.get('/login', LoginGet)

login.post('/login', LoginPostValidation, LoginPost)

export { login as loginRouter }