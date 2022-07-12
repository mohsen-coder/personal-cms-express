import {UpdateMessageUseCase} from "../../../application/ports/in/UpdateMessageUseCase";
import {Request, Response} from "express";
import {MessageModel} from "./model/MessageModel";

export function UpdateMessageMiddleware(updateMessageUseCase: UpdateMessageUseCase) {
    return async (request: Request, response: Response) => {
        const messageModel = new MessageModel(request.body)
        const messageResponse = await updateMessageUseCase.updateMessage(messageModel.toDomainModel());
        response.status(messageResponse.status === "success" ? 200 : 400).send(messageResponse);
    }
}