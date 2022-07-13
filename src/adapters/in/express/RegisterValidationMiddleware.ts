import {NextFunction, Request, Response} from "express";
import Joi from "joi";
import {ResponseBase} from "../../../application/ports/in/response/ResponseBase";
import {ResponseStatus} from "../../../application/ports/in/response/ResponseStatus";

export function RegisterValidationMiddleware(){

    const schema = Joi.object({
        name: Joi.string().trim().min(2).max(25).required().messages({
            'string.min': 'نام باید حداقل ۲ حرف باشد!',
            'string.max': 'نام نمی تواند بیش از ۲۵ حرف باشد!',
            'any.required': 'نام الزامی می باشد!'
        }),
        family: Joi.string().trim().min(2).max(25).required().messages({
            'string.min': 'نام خانوادگی باید حداقل ۲ حرف باشد!',
            'string.max': 'نام خانوادگی نمی تواند بیش از ۲۵ حرف باشد!',
            'any.required': 'نام خانوادگی الزامی می باشد!'
        }),
        email: Joi.string().trim().email().required().messages({
            'string.email': 'ایمیل معتبر نمی باشد!',
            'any.required': 'ایمیل الزامی می باشد!'
        }),
        username: Joi.string().trim().min(3).max(25).required().messages({
            'string.min': 'نام کاربری باید حداقل ۳ حرف باشد!',
            'string.max': 'نام کاربری نمی تواند بیش از ۲۵ حرف باشد!',
            'any.required': 'نام کاربری الزامی می باشد!'
        }),
        password: Joi.string().trim().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/).required().messages({
            'string.pattern.base': 'گذرواژه قابل پذیرش نیست!',
            'any.required': 'گذرواژه الزامی می باشد!'
        }),
        confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
            'any.only': 'تکرار گذرواژه صحیح نیست!',
            'any.required': 'تکرار گذرواژه الزامی می باشد!'
        })
    })

    return (request: Request, response: Response, next: NextFunction) => {
        const {error} = schema.validate(request.body, {abortEarly: false})
        console.log(error)
        if (error) {
            const responseBase = new ResponseBase();
            responseBase.status = ResponseStatus.error;
            responseBase.messages = error.details.map(err => err.message)
            response.status(400).send(responseBase);
            return;
        }
        next()
    }
}