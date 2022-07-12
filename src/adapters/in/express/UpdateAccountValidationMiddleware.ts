import {Request, Response, NextFunction} from "express";
import Joi from "joi";
import {ResponseBase} from "../../../application/ports/in/response/ResponseBase";
import {ResponseStatus} from "../../../application/ports/in/response/ResponseStatus";

export function UpdateAccountValidationMiddleware() {
    const schema = Joi.object({
        id: Joi.string().trim().required().messages({
            'string.base': 'آیدی باید حروف باشد!',
            'any.required': 'آیدی الزامی می باشد!'
        }),
        thumbnail: Joi.object({
            id: Joi.string().trim().required().messages({
                'string.base': 'آیدی آواتار باید حروف باشد!',
                'any.required': 'آیدی آواتار الزامی می باشد!'
            })
        }).optional().allow(null).messages({
            'object.base': 'آواتار باید آبجکت باشد!'
        }),
        name: Joi.string().trim().min(2).max(25).optional().allow(null).messages({
            'string.min': 'نام باید حداقل ۲ حرف باشد!',
            'string.max': 'نام نمی تواند بیش از ۲۵ حرف باشد!'
        }),
        family: Joi.string().trim().min(2).max(25).optional().allow(null).messages({
            'string.min': 'نام خانوادگی باید حداقل ۲ حرف باشد!',
            'string.max': 'نام خانوادگی نمی تواند بیش از ۲۵ حرف باشد!'
        }),
        email: Joi.string().trim().email().optional().allow(null).messages({
            'string.email': 'ایمیل معتبر نمی باشد!'
        }),
        username: Joi.string().trim().min(3).max(25).optional().allow(null).messages({
            'string.min': 'نام کاربری باید حداقل ۳ حرف باشد!',
            'string.max': 'نام کاربری نمی تواند بیش از ۲۵ حرف باشد!'
        }),
        about: Joi.string().trim().min(3).max(500).optional().allow(null).messages({
            'string.min': 'توضیحات کاربر باید حداقل ۳ حرف باشد!',
            'string.max': 'توضیحات کاربر نمی تواند بیش از ۵۰۰ حرف باشد!',
            'string.base': 'توضیحات باید حروف باشد!'
        }),
        role: Joi.string().trim().optional().allow(null).messages({
            'string.base': 'نقش باید حروف باشد!'
        }),
        password: Joi.string().trim().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/).optional().allow(null).messages({
            'string.pattern.base': 'گذرواژه قابل پذیرش نیست!'
        }),
    })

    return (request: Request, response: Response, next: NextFunction) => {
        const {error} = schema.validate(request.body, {abortEarly: false});
        if (error) {
            const responseBase = new ResponseBase();
            responseBase.status = ResponseStatus.error;
            responseBase.messages = error.details.map(err => err.message);
            response.status(400).send(responseBase);
            return;
        }
        next();
    }
}