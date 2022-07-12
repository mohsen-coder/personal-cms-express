import {Request, Response, NextFunction} from "express";
import Joi from "joi";
import {ResponseBase} from "../../../application/ports/in/response/ResponseBase";
import {ResponseStatus} from "../../../application/ports/in/response/ResponseStatus";

export function GetCommentValidationMiddleware(){
    const schema = Joi.object({
        id: Joi.string().trim().optional().allow(null),
        postId: Joi.string().trim().optional().allow(null),
        status: Joi.string().trim().optional().allow(null),
        offset: Joi.number().optional().allow(null),
        limit: Joi.number().min(1).max(100).optional().allow(null).messages({
            'number.min': 'تعداد حداقل باید ۱ باشد!',
            'number.max': 'حداکثر تعداد ۱۰۰ می باشد!'
        })
    })

    return (request: Request, response: Response, next: NextFunction) => {
        const {error} = schema.validate(request.query, {abortEarly: false})
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