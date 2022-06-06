import {GetPostUseCase} from "../../../application/ports/in/GetPostUseCase";
import {Request, Response} from "express";
import {trim, toString, toNumber} from "lodash";

export function GetPostMiddleware(getPostUseCase: GetPostUseCase) {
    return async (request: Request, response: Response) => {
        const data:
            { id?: string | undefined, categoryId?: string | undefined, pagination?: { offset: number, limit: number } }
            = {}

        if (request.query.id) data.id = trim(toString(request.query.id));
        if (request.query.categoryId) data.categoryId = trim(toString(request.query.categoryId));
        if (request.query.offset && request.query.limit)
            data.pagination = {
                offset: toNumber(request.query.offset),
                limit: toNumber(request.query.limit)
            };

        const postResponse = await getPostUseCase.getPost(data);

        response.status(postResponse.status === "success" ? 200 : 400)
        response.send(postResponse);
    }
}