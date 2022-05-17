import {Request, Response, NextFunction} from 'express'
import { RouteHelper } from '../../helper/RouteHelper';
import { redirectWithMessage } from '../../utils/RedirectUtil';
import { categoryPostSchema } from '../../validators/CategoryPostValidator';

export const CategoryPostValidation = (req: Request, res: Response, next: NextFunction) => {
    const { error } = categoryPostSchema.validate(req.body, { abortEarly: false })
    if (error) return res.redirect(redirectWithMessage(RouteHelper.categories, [error.message], "error"));
    next()
}