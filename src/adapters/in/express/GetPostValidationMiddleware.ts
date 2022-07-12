import {NextFunction, Request, Response} from "express";
import Joi from "joi";
import {ResponseBase} from "../../../application/ports/in/response/ResponseBase";
import {ResponseStatus} from "../../../application/ports/in/response/ResponseStatus";

export function GetPostValidationMiddleware() {
    const schema = Joi.object({
        id: Joi.string().trim().optional().allow(null).messages({
            'string.base': 'آیدی باید حروف باشد!'
        }),
        postTitle: Joi.string().trim().optional().allow(null).messages({
            'string.base': 'عنوان مطلب باید حروف باشد!'
        }),
        categoryId: Joi.string().trim().optional().allow(null).messages({
            'string.base': 'آیدی دسته بندی باید حروف باشد!'
        }),
        categoryTitle: Joi.string().trim().optional().allow(null).messages({
            'string.base': 'عنوان دسته بندی باید حروف باشد!'
        }),
        status: Joi.string().trim().optional().allow(null).messages({
            'string.base': 'وضعیت باید حروف باشد!'
        }),
        like: Joi.boolean().optional().allow(null).messages({
            'boolean.base': 'لایک باید بولین باشد!'
        }),
        view: Joi.boolean().optional().allow(null).messages({
            'boolean.base': 'بازدید باید بولین باشد!'
        }),
        offset: Joi.number().optional().allow(null).messages({
            'number.base': 'گذر باید عدد باشد!'
        }),
        limit: Joi.number().min(1).max(100).optional().allow(null).messages({
            'number.min': 'حداقل تعداد ۱ می باشد!',
            'number.max': 'حداکثر تعداد ۱۰۰ می باشد!',
            'number.base': 'تعداد باید عدد باشد!'
        })
    })

    return (request: Request, response: Response, next: NextFunction) => {
        const {error} = schema.validate(request.query, {abortEarly: false});
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