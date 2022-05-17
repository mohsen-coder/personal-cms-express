import { Request, Response, NextFunction } from 'express'
import { registerPostSchema } from "../validators/RegisterPostValidator";

export const RegisterPostValidation = async (req: Request, res: Response, next: NextFunction) => {
    const { error } = registerPostSchema.validate(req.body, { abortEarly: false })
    if (error) return res.redirect(`/register?error-message="${error.message}"`);
    next()
}