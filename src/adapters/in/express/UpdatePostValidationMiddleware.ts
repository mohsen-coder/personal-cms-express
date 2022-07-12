import {Request, Response, NextFunction} from "express";
import Joi from "joi";
import {ResponseBase} from "../../../application/ports/in/response/ResponseBase";
import {ResponseStatus} from "../../../application/ports/in/response/ResponseStatus";

export function UpdatePostValidationMiddleware(){
    const schema = Joi.object({
        id: Joi.string().trim().required().messages({
            'any.required': 'آیدی الزامی می باشد!'
        }),
        thumbnail: Joi.object({
            id: Joi.string().required().messages({
                'any.required': 'آیدی تصویر الزامی می باشد!'
            })
        }).optional().allow(null).messages({
            'object.base': 'تصویر باید آبجکت باشد!'
        }),
        title: Joi.string().trim().min(3).max(125).optional().allow(null).messages({
            'string.min': 'عنوان باید حداقل ۳ حرف باشد!',
            'string.max': 'عنوان نمی تواند بیش از ۱۲۵ حرف باشد!',
            'string.base': 'عنوان باید حروف باشد!',
        }),
        content: Joi.string().trim().optional().allow(null),
        fullContent: Joi.string().trim().optional().allow(null),
        categories: Joi.array().items(Joi.object({
            id: Joi.string().trim().required().messages({
                'any.required': 'آیدی دسته بندی الزامی می باشد!'
            })
        }).messages({
            'object.base': 'آیتم دسته بندی باید آبجکت باشد!'
        })).optional().allow(null).messages({
            'array.base': 'دسته بندی ها باید آرایه باشد!',
            'array.includesRequiredUnknowns': 'دسته بندی ها باید حداقل یک عضو داشته باشد!'
        }),
        tags: Joi.array().items(Joi.string().trim().required().messages({
            'string.base': 'برچسب باید حروف باشد!',
            'any.required': 'برچسب الزامی می باشد!'
        })).optional().allow(null).messages({
            'array.base': 'برچسب ها باید آرایه باشد!',
            'array.includesRequiredUnknowns': 'برچسب ها باید حداقل یک عضو داشته باشد!'
        }),
        publishDate: Joi.number().optional().allow(null).messages({
            'number.base': 'تاریخ انتشار باید عدد باشد!'
        }),
        status: Joi.string().trim().optional().allow(null).messages({
            'string.base': 'وضعیت باید حروف باشد!',
        })
    })

    return (request: Request, response: Response, next: NextFunction) => {
        const {error} = schema.validate(request.body, {abortEarly: false});
        console.log(error)
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