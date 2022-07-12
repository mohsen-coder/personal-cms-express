import {Message} from "../../../domain/Message";
import {MessageDAO} from "./dao/MessageDAO";

export interface UpdateMessagePort {
    updateMessage(message: Message): Promise<MessageDAO>
}