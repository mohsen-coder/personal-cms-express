import {DeleteMessageUseCase} from "../../../application/ports/in/DeleteMessageUseCase";
import {Request, Response} from "express";

export function DeleteMessageMiddleware(deleteMessageUseCase: DeleteMessageUseCase) {
    return async (request: Request, response: Response) => {
        const responseBase = await deleteMessageUseCase.deleteMessage(request.params.id);
        response.status(responseBase.status === "success" ? 200 : 400).send(responseBase)
    }
}