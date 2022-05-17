import {Request, Response, NextFunction} from 'express'
import { RouteHelper } from '../../helper/RouteHelper';
import { redirectWithMessage } from '../../utils/RedirectUtil';
import { categoryPutSchema } from '../../validators/CategoryPutValidator';

export const CategoryPutValidation = (req: Request, res: Response, next: NextFunction) => {
    const { error } = categoryPutSchema.validate(req.body, { abortEarly: false })
    if (error) return res.redirect(redirectWithMessage(RouteHelper.categories, [error.message], "error"));
    next()
}