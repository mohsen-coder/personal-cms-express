import { GetMessageUseCase } from "../../../application/ports/in/GetMessageUseCase";
import { Request, Response } from "express";
import { toNumber, toString } from "lodash";

export function GetMessageMiddleware(getMessageUseCase: GetMessageUseCase) {
    return async (request: Request, response: Response) => {
        const data: { messageId?: string, email?: string, status?: string, offset?: number, limit?: number } = {}

        if (request.query.messageId) data.messageId = toString(request.query.messageId);
        if (request.query.email) data.email = toString(request.query.email);
        if (request.query.status) data.status = toString(request.query.status);
        if (request.query.offset && request.query.limit) {
            data.offset = toNumber(request.query.offset)
            data.limit = toNumber(request.query.limit)
        }

        const messageResponse = await getMessageUseCase.getMessage(data);
        response.status(messageResponse.status === "success" ? 200 : 400).send(messageResponse)
    }
}