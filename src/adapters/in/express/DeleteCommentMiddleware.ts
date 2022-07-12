import {DeleteCommentUseCase} from "../../../application/ports/in/DeleteCommentUseCase";
import {Request, Response} from "express";

export function DeleteCommentMiddleware(deleteCommentUseCase: DeleteCommentUseCase) {
    return async (request: Request, response: Response) => {
        const responseBase = await deleteCommentUseCase.deleteComment(request.params.id);
        response.status(responseBase.status === "success" ? 200 : 400).send(responseBase)
    }
}