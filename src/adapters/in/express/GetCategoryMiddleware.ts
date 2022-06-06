import {GetCategoryUseCase} from "../../../application/ports/in/GetCategoryUseCase";
import {Request, Response} from "express";
import {trim, toString, toNumber} from "lodash";

export function GetCategoryMiddleware(getCategoryUseCase: GetCategoryUseCase) {
    return async (request: Request, response: Response) => {
        const data:
            { id?: string | undefined, title?: string | undefined, parentId?: string | undefined, pagination?: { offset: number, limit: number } }
            = {}
        if (request.query.id) data.id = trim(toString(request.query.id));
        if (request.query.title) data.title = trim(toString(request.query.title));
        if (request.query.parentId) data.parentId = trim(toString(request.query.parentId));
        if (request.query.offset && request.query.limit)
            data.pagination = {
                offset: toNumber(request.query.offset),
                limit: toNumber(request.query.limit)
            };

        const categoryResponse = await getCategoryUseCase.getCategory(data);

        response.status(categoryResponse.status === "success" ? 200 : 400)
        response.send(categoryResponse);
    }
}