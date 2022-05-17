import { Request, Response, NextFunction } from 'express'
import { loginPostSchema } from "../validators/LoginPostValidator"

export const LoginPostValidation = (req: Request, res: Response, next: NextFunction) => {
    const { error } = loginPostSchema.validate(req.body, { abortEarly: false })
    if (error) return res.redirect(`/login?error-message="${error.message}"`);
    next()
}