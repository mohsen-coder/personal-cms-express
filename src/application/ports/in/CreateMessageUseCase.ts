import {Message} from "../../../domain/Message";
import {MessageResponse} from "./response/MessageResponse";

export interface CreateMessageUseCase {
    createMessage(message: Message): Promise<MessageResponse>
}