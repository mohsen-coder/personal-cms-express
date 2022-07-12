import {ResponseBase} from "./response/ResponseBase";

export interface DeleteMessageUseCase {
    deleteMessage(messageId: string): Promise<ResponseBase>
}