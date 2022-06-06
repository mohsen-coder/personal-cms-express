import {UpdatePostUseCase} from "../../../application/ports/in/UpdatePostUseCase";
import {Request, Response} from "express";
import {PostModel} from "./model/PostModel";

export function UpdatePostMiddleware(updatePostUseCase: UpdatePostUseCase) {
    return async (request: Request, response: Response) => {
        const postModel = new PostModel(request.body);
        const postResponse = await updatePostUseCase.updatePost(postModel.toDomainModel());
        response.status(postResponse.status === "success" ? 200 : 400)
        response.send(postResponse);
    }
}