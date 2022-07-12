import {Request, Response, NextFunction} from "express";
import Joi from "joi";
import {ResponseBase} from "../../../application/ports/in/response/ResponseBase";
import {ResponseStatus} from "../../../application/ports/in/response/ResponseStatus";
import {JWT} from "../../../utils/JWT";

export function GetAccountValidationMiddleware() {
    const schema = Joi.object({
        id: Joi.string().trim().optional().allow(null),
        username: Joi.string().trim().optional().allow(null),
        email: Joi.string().trim().optional().allow(null),
        offset: Joi.number().optional().allow(null).messages({
            'number.base': 'گذر باید عدد باشد!'
        }),
        limit: Joi.number().min(1).max(100).optional().allow(null).messages({
            'number.min': 'حداقل تعداد ۱ است!',
            'number.max': 'حداکثر تعداد ۱۰۰ است!',
            'number.base': 'تعداد باید عدد باشد!'
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