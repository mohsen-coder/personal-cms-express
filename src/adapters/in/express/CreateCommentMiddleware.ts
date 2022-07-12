import {CreateCommentUseCase} from "../../../application/ports/in/CreateCommentUseCase";
import {Request, Response} from "express";
import {CommentModel} from "./model/CommentModel";
import {JWT} from "../../../utils/JWT";

export function CreateCommentMiddleware(createCommentUseCase: CreateCommentUseCase) {
    return async (request: Request, response: Response) => {
        const comment = new CommentModel(request.body)
        const data = JWT.authenticateToken(request.header("authorization")!)
        if (data){
            comment.name = data.name + ' ' + data.family;
            comment.email = data.email;
            comment.status = data.role === "admin" ? "accept" : "none";
        }
        const commentResponse = await createCommentUseCase.createComment(comment.toDomainModel());
        response.status(commentResponse.status === "success" ? 200 : 400).send(commentResponse)
    }
}