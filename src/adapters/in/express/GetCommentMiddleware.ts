import {GetCommentUseCase} from "../../../application/ports/in/GetCommentUseCase";
import {Request, Response} from "express";
import {toNumber, toString} from "lodash";

export function GetCommentMiddleware(getCommentUseCase: GetCommentUseCase) {
    return async (request: Request, response: Response) => {
        const data: { id?: string, postId?: string, status?: string, offset?: number, limit?: number } = {}
        if (request.query.id) data.id = toString(request.query.id);
        if (request.query.postId) data.postId = toString(request.query.postId);
        if (request.query.status) data.status = toString(request.query.status);
        if (request.query.offset) data.offset = toNumber(request.query.offset);
        if (request.query.limit) data.limit = toNumber(request.query.limit);

        const commentResponse = await getCommentUseCase.getComment(data);
        response.status(commentResponse.status === "success" ? 200 : 400).send(commentResponse)
    }
}