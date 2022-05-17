import {Request, Response, NextFunction} from 'express'
import { RouteHelper } from '../../helper/RouteHelper';
import { redirectWithMessage } from '../../utils/RedirectUtil';
import { categoryDeleteSchema } from '../../validators/CategoryDeleteValidator';

export const CategoryDeleteValidation = (req: Request, res: Response, next: NextFunction) => {
    const { error } = categoryDeleteSchema.validate(req.body, { abortEarly: false })
    if (error) return res.redirect(redirectWithMessage(RouteHelper.categories, [error.message], "error"));
    next()
}