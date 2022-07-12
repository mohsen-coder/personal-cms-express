import {Message} from "../../../domain/Message";
import {MessageDAO} from "./dao/MessageDAO";

export interface CreateMessagePort {
    createMessage(message: Message): Promise<MessageDAO>
}