import {Request, Response, NextFunction} from "express";
import Joi from "joi";
import {ResponseBase} from "../../../application/ports/in/response/ResponseBase";
import {ResponseStatus} from "../../../application/ports/in/response/ResponseStatus";

export function CreateMessageValidationMiddleware() {
    const schema = Joi.object({
        name: Joi.string().trim().min(2).max(25).optional().allow(null).messages({
            'string.min': 'نام باید حداقل ۲ حرف باشد!',
            'string.max': 'نام می تواند حداکثر ۲۵ حرف باشد!',
            'string.base': 'نام باید حروف باشد!',
            'any.required': 'نام اجباری می باشد!'
        }),
        email: Joi.string().trim().email().optional().allow(null).messages({
            'string.email': 'ایمیل معتبر نمی باشد!',
            'string.base': 'ایمیل باید حروف باشد!',
            'any.required': 'ایمیل الزامی می باشد!'
        }),
        webSite: Joi.string().uri().optional().allow(null).messages({
            'string.uri': 'آدرس معتبر نمی باشد!',
            'string.base': 'آدرس باید حروف باشد!'
        }),
        title: Joi.string().trim().min(3).max(125).optional().allow(null).messages({
            'string.min': 'عنوان باید حداقل ۳ حرف باشد!',
            'string.max': 'عنوان می تواند حداکثر ۱۲۵ حرف باشد!',
            'string.base': 'عنوان باید حروف باشد!',
            'any.required': 'عنوان الزامی می باشد!'
        }),
        content: Joi.string().trim().min(3).max(500).required().messages({
            'string.min': 'محتوا باید حداقل ۳ حرف باشد',
            'string.max': 'محتوا می تواند حداکثر ۵۰۰ حرف باشد!',
            'string.base': 'محتوا فقط باید حروف باشد!',
            'any.required': 'محتوا اجباری می باشد!'
        }),
        parent: Joi.object({
            id: Joi.string().trim().required().messages({
                'string.base': 'آیدی پدر باید حروف باشد!',
                'any.required': 'آیدی پدر الزامی می باشد!'
            })
        }).optional().allow(null).messages({
            'object.base': 'پیغام پدر باید آبجکت باشد!'
        }),
        file: Joi.object({
            id: Joi.string().trim().required().messages({
                'string.base': 'آیدی فایل باید حروف باشد!',
                'any.required': 'آیدی فایل الزامی می باشد!'
            })
        }).optional().allow(null).messages({
            'object.base': 'فایل باید آبجکت باشد!'
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