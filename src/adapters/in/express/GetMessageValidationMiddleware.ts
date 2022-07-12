import {NextFunction, Request, Response} from "express";
import Joi from "joi";
import {ResponseBase} from "../../../application/ports/in/response/ResponseBase";
import {ResponseStatus} from "../../../application/ports/in/response/ResponseStatus";
import {JWT} from "../../../utils/JWT";

export function GetMessageValidationMiddleware() {
    const schema = Joi.object({
        messageId: Joi.string().trim().optional().allow(null).messages({
            'string.base': 'آیدی باید حروف باشد!'
        }),
        email: Joi.string().trim().email().optional().allow(null).messages({
            'string.base': 'ایمیل باید حروف باشد!',
            'string.email': 'ایمیل معتبر نمی باشد!'
        }),
        status: Joi.string().trim().optional().allow(null).messages({
            'string.base': 'وضعیت باید حروف باشد!'
        }),
        offset: Joi.number().optional().allow(null).messages({
            'number.base': 'گذر باید عدد باشد!'
        }),
        limit: Joi.number().min(1).max(100).optional().allow(null).messages({
            'number.min': 'حداقل تعداد ۱ می باشد!',
            'number.max': 'حداکثر تعداد ۱۰۰ می باشد!'
        })
    })

    return (request: Request, response: Response, next: NextFunction) => {
        const {error} = schema.validate(request.body, {abortEarly: false})
        if (error) {
            const responseBase = new ResponseBase();
            responseBase.status = ResponseStatus.error;
            responseBase.messages = error.details.map(err => err.message)
            response.status(400).send(responseBase)
            return;
        }
        next();
    }
}