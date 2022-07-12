import { CreateMessageUseCase } from "../../../application/ports/in/CreateMessageUseCase";
import { Request, Response } from "express";
import { MessageModel } from "./model/MessageModel";
import { JWT } from "../../../utils/JWT";

export function CreateMessageMiddleware(createMessageUseCase: CreateMessageUseCase) {
    return async (request: Request, response: Response) => {
        const messageModel = new MessageModel(request.body)
        const data = JWT.authenticateToken(request.header("authorization")!)
        if (data && data.role === "admin") {
            messageModel.name = data.name + ' ' + data.family;
            messageModel.status = "read";
        }else if(data && data.role !== "admin") messageModel.name = data.name + ' ' + data.family;
        const messageResponse = await createMessageUseCase.createMessage(messageModel.toDomainModel());
        response.status(messageResponse.status === "success" ? 200 : 400).send(messageResponse)
    }
}