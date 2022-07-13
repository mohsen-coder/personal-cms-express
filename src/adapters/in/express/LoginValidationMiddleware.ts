import {Request, Response, NextFunction} from "express";
import Joi from "joi";
import {ResponseBase} from "../../../application/ports/in/response/ResponseBase";
import {ResponseStatus} from "../../../application/ports/in/response/ResponseStatus";

export function LoginValidationMiddleware(){
    const schema = Joi.object({
        username: Joi.string().trim().min(3).required().messages({
            'string.min': 'نام کاربری باید حداقل ۳ کاراکتر باشد!',
            'string.max': 'نام کاربری نمی تواند بیشتر از ۲۵ حرف باشد!',
            'any.required': 'نام کاربری الزامی می باشد!'
        }),
        password: Joi.string().trim().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/).required().messages({
            'string.pattern.base': 'رمز عبور معتبر نمی باشد!',
            'any.required': 'رمز عبور الزامی می باشد!'
        })
    })

    return (request: Request, response: Response, next: NextFunction) => {
        const {error} = schema.validate(request.body, {abortEarly: false});
        if(error){
            const responseBase = new ResponseBase();
            responseBase.status = ResponseStatus.error;
            responseBase.messages = error.details.map(err => err.message);
            response.status(400).send(responseBase);
            return;
        }
        next();
    }
}