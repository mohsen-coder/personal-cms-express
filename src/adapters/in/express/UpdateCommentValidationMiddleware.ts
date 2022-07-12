import {Request, Response, NextFunction} from "express";
import Joi from "joi";
import {ResponseBase} from "../../../application/ports/in/response/ResponseBase";
import {ResponseStatus} from "../../../application/ports/in/response/ResponseStatus";

export function UpdateCommentValidationMiddleware(){
    const schema = Joi.object({
        id: Joi.string().trim().required().messages({
            'any.required': 'آیدی الزامی می باشد!'
        }),
        name: Joi.string().trim().min(2).max(25).optional().allow(null).messages({
            'string.min': 'نام باید حداقل ۲ حرف باشد!',
            'string.max': 'نام نمی تواند بیشتر از ۲۵ حرف باشد!'
        }),
        email: Joi.string().trim().email().optional().allow(null).messages({
            'string.email': 'ایمیل معتبر نمی باشد!',
            'string.required': 'ایمیل اجباری می باشد!'
        }),
        post: Joi.object({
            id: Joi.string().trim().required().messages({
                'any.required': 'آیدی الزامی می باشد!'
            })
        }).optional().allow(null).messages({
            'object.base': 'پست باید آبجکت باشد!'
        }),
        content: Joi.string().trim().min(3).max(500).optional().allow(null).messages({
            'string.min': 'محتوا حداقل باید ۳ حرف باشد!',
            'string.max': 'محتوا نمی تواند بیشتر از ۵۰۰ حرف باشد!'
        }),
        parent: Joi.object({
            id: Joi.string().trim().required().messages({
                'any.required': 'آیدی الزامی می باشد!'
            })
        }).optional().allow(null).messages({
            'object.base': 'پدر باید آبجکت باشد!'
        }),
        status: Joi.string().trim().optional().allow(null).messages({
           'string.base': 'وضعیت باید حروف باشد!'
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