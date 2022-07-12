import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import {ResponseBase} from "../../../application/ports/in/response/ResponseBase";
import {ResponseStatus} from "../../../application/ports/in/response/ResponseStatus";


export function CreateCategoryValidationMiddleware() {
    const schema = Joi.object({
        id: Joi.string().trim().optional().allow(null),
        parent: Joi.object({
            id: Joi.string().trim().required().messages({
                'any.required': 'آیدی پدر اجباری می باشد!'
            })
        }).optional().allow(null).messages({
            'object.base': 'پدر باید آبجکت باشد!'
        }),
        title: Joi.string().trim().min(3).required().messages({
            'string.min': 'عنوان حداقل باید ۳ حرف باشد!',
            'any.required': 'عنوان اجباری می باشد!'
        })
    })

    return (request: Request, response: Response, next: NextFunction) => {
        const {error} = schema.validate(request.body, {abortEarly: false})
        if (error){
            const responseBase = new ResponseBase();
            responseBase.status = ResponseStatus.error;
            responseBase.messages = error.details.map(err => err.message)
            response.status(400).send(responseBase)
            return;
        }
         next();
    }
}