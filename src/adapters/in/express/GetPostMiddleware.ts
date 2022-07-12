import {GetPostUseCase} from "../../../application/ports/in/GetPostUseCase";
import {Request, Response} from "express";
import {trim, toString, toNumber} from "lodash";

export function GetPostMiddleware(getPostUseCase: GetPostUseCase) {
    return async (request: Request, response: Response) => {
        const data:
            {
                id?: string,
                postTitle?: string,
                categoryId?: string,
                categoryTitle?: string,
                status?: string,
                like?: boolean,
                view?: boolean,
                pagination?: { offset: number, limit: number }
            }
            = {}

        if (request.query.id) data.id = trim(toString(request.query.id));
        if (request.query.postTitle) data.postTitle = trim(toString(request.query.postTitle));
        if (request.query.categoryId) data.categoryId = trim(toString(request.query.categoryId));
        if (request.query.categoryTitle) data.categoryTitle = trim(toString(request.query.categoryTitle));
        if (request.query.status) data.status = trim(toString(request.query.status));
        if (request.query.like) data.like = true;
        if (request.query.view) data.view = true;
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