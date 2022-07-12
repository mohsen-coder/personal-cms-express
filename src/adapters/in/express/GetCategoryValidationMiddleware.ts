import {Request, Response, NextFunction} from "express";
import Joi from "joi";
import {ResponseBase} from "../../../application/ports/in/response/ResponseBase";
import {ResponseStatus} from "../../../application/ports/in/response/ResponseStatus";
import {JWT} from "../../../utils/JWT";

export function GetCategoryValidationMiddleware() {
    const schema = Joi.object({
        id: Joi.string().trim().optional().allow(null),
        title: Joi.string().trim().optional().allow(null),
        parentId: Joi.string().trim().optional().allow(null)
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