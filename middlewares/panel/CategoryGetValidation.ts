import {Request, Response, NextFunction} from 'express'
import { RouteHelper } from '../../helper/RouteHelper';
import { redirectWithMessage } from '../../utils/RedirectUtil';
import { categoryGetSchema } from '../../validators/CategoryGetValidator';

export const CategoryGetValidation = (req: Request, res: Response, next: NextFunction) => {
    const { error } = categoryGetSchema.validate(req.body, { abortEarly: false })
    if (error) return res.redirect(redirectWithMessage(RouteHelper.categories, [error.message], "error"));
    next()
}