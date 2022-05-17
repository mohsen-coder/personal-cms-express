import { Request, Response, NextFunction } from 'express'
import { RouteHelper } from '../helper/RouteHelper';
import { redirectWithMessage } from '../utils/RedirectUtil';
import { loginPostSchema } from "../validators/LoginPostValidator"

export const LoginPostValidation = (req: Request, res: Response, next: NextFunction) => {
    const { error } = loginPostSchema.validate(req.body, { abortEarly: false })
    if (error) return res.redirect(redirectWithMessage(RouteHelper.login, [error.message], "error"));
    next()
}