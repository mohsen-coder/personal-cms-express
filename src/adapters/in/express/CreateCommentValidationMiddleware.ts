import {Request, Response, NextFunction} from "express";
import Joi from "joi";
import {ResponseBase} from "../../../application/ports/in/response/ResponseBase";
import {ResponseStatus} from "../../../application/ports/in/response/ResponseStatus";

export function CreateCommentValidationMiddleware(){
    const schema = Joi.object({
        name: Joi.string().trim().min(2).max(25).optional().allow(null).messages({
            'string.min': 'نام باید حداقل ۲ حرف باشد!',
            'string.max': 'نام نمی تواند بیشتر از ۲۵ حرف باشد!',
            'any.required': 'نام اجباری می باشد!'
        }),
        email: Joi.string().trim().email().optional().allow(null).messages({
            'string.email': 'ایمیل معتبر نمی باشد!',
            'string.required': 'ایمیل اجباری می باشد!'
        }),
        post: Joi.object({
            id: Joi.string().trim().required().messages({
                'any.required': 'آیدی پست الزامی می باشد!'
            })
        }).required().messages({
            'object.base': 'پست باید آبجکت باشد!',
            'any.required': 'پست الزامی می باشد!'
        }),
        content: Joi.string().trim().min(3).max(500).required().messages({
            'string.min': 'محتوا حداقل باید ۳ حرف باشد!',
            'string.max': 'محتوا نمی تواند بیشتر از ۵۰۰ حرف باشد!',
            'any.required': 'محتوا الزامی می باشد!'
        }),
        parent: Joi.object({
            id: Joi.string().trim().required().messages({
                'any.required': 'آیدی پدر الزامی می باشد!'
            })
        }).optional().allow(null).messages({
            'object.base': 'پدر باید آبجکت باشد!'
        })
    })

    return (request: Request, response: Response, next: NextFunction) => {
        const {error} = schema.validate(request.body, {abortEarly: false});
        if (error){
            const responseBase = new ResponseBase();
            responseBase.status = ResponseStatus.error;
            responseBase.messages = error.details.map(err => err.message);
            response.status(400).send(responseBase);
            return;
        }
        next();
    }
}