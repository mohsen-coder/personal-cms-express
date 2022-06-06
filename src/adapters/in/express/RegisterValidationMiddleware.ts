import {NextFunction, Request, Response} from "express";
import Joi from "joi";

export function RegisterValidationMiddleware(){

    const schema = Joi.object({
        name: Joi.string().trim().min(2).max(25).required(),
        family: Joi.string().trim().min(2).max(25).required(),
        email: Joi.string().trim().email().required(),
        username: Joi.string().trim().min(3).max(25).required(),
        password: Joi.string().trim().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/),
        confirmPassword: Joi.string().valid(Joi.ref('password')).required()
    })

    return (req: Request, res: Response, next: NextFunction) => {
        const {error} = schema.validate(req.body, {abortEarly: false})

        if (error) {
            res.status(400)
            res.send(error)
            return;
        }

        next()
    }
}