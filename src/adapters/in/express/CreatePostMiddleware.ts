import {CreatePostUseCase} from "../../../application/ports/in/CreatePostUseCase";
import {Request, Response} from "express";
import {PostModel} from "./model/PostModel";

export function CreatePostMiddleware(createPostUseCase: CreatePostUseCase){
    return async (request: Request, response: Response) => {
        const postModel = new PostModel(request.body);
        const postResponse = await createPostUseCase.createPost(postModel.toDomainModel());
        response.status(postResponse.status === "success" ? 200 : 400)
        response.send(postResponse)
    }
}