import {CreatePostUseCase} from "../../../application/ports/in/CreatePostUseCase";
import {Request, Response} from "express";
import {PostModel} from "./model/PostModel";
import {JWT} from "../../../utils/JWT";

export function CreatePostMiddleware(createPostUseCase: CreatePostUseCase) {
    return async (request: Request, response: Response) => {
        const data = JWT.authenticateToken(request.header("authorization")!)
        const postModel = new PostModel(request.body);
        postModel.author.id = data!.accountId
        if (!postModel.publishDate || postModel.publishDate === 0) postModel.publishDate = new Date().getTime();
        const postResponse = await createPostUseCase.createPost(postModel.toDomainModel());
        response.status(postResponse.status === "success" ? 200 : 400)
        response.send(postResponse)
    }
}