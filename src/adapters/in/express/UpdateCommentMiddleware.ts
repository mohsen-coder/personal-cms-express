import {UpdateCommentUseCase} from "../../../application/ports/in/UpdateCommentUseCase";
import {Request, Response} from "express";
import {CommentModel} from "./model/CommentModel";

export function UpdateCommentMiddleware(updateCommentUseCase: UpdateCommentUseCase) {
    return async (request: Request, response: Response) => {
        const commentModel = new CommentModel(request.body)
        const commentResponse = await updateCommentUseCase.updateComment(commentModel.toDomainModel());
        response.status(commentResponse.status === "success" ? 200 : 400).send(commentResponse);
    }
}