import {MessageResponse} from "./response/MessageResponse";

export interface GetMessageUseCase {
    getMessage(request: {messageId?: string, email?: string, offset?: number, limit?: number}): Promise<MessageResponse>
}