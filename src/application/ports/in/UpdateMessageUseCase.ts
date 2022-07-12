import {Message} from "../../../domain/Message";
import {MessageResponse} from "./response/MessageResponse";

export interface UpdateMessageUseCase {
    updateMessage(message: Message): Promise<MessageResponse>
}