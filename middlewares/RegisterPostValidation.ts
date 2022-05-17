import { Request, Response, NextFunction } from 'express'
import { RouteHelper } from '../helper/RouteHelper';
import { redirectWithMessage } from '../utils/RedirectUtil';
import { registerPostSchema } from "../validators/RegisterPostValidator";

export const RegisterPostValidation = async (req: Request, res: Response, next: NextFunction) => {
    const { error } = registerPostSchema.validate(req.body, { abortEarly: false })
    if (error) return res.redirect(redirectWithMessage(RouteHelper.register, [error.message], "error"));
    next()
}