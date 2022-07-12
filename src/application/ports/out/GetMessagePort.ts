import {Message} from "../../../domain/Message";
import {MessageDAO} from "./dao/MessageDAO";

export interface GetMessagePort {
    getMessageById(messageId: string): Promise<MessageDAO>

    getMessagesByEmail(email: string): Promise<MessageDAO>

    getMessageByStatus(status: string, offset: number, limit: number): Promise<MessageDAO>
}