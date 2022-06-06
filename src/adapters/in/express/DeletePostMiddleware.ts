import {DeletePostUseCase} from "../../../application/ports/in/DeletePostUseCase";
import {Request, Response} from "express";

export function DeletePostMiddleware(deletePostUseCase: DeletePostUseCase) {
    return async (request: Request, response: Response) => {
        const responseBase = await deletePostUseCase.deletePost(request.params.id);
        response.status(responseBase.status === "success" ? 200 : 400)
        response.send(responseBase);
    }
}