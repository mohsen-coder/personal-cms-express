import {UpdateMessageUseCase} from "../ports/in/UpdateMessageUseCase";
import {GetMessagePort} from "../ports/out/GetMessagePort";
import {UpdateMessagePort} from "../ports/out/UpdateMessagePort";
import {Message} from "../../domain/Message";
import {MessageResponse} from "../ports/in/response/MessageResponse";
import {ResponseStatus} from "../ports/in/response/ResponseStatus";
import {Messages} from "../../../values/Messages";
import {MessageModel} from "../../adapters/in/express/model/MessageModel";

export class UpdateMessageService implements UpdateMessageUseCase {

    constructor(
        private readonly getMessageRepo: GetMessagePort,
        private readonly updateMessageRepo: UpdateMessagePort
    ) {
    }

    async updateMessage(message: Message): Promise<MessageResponse> {
        const messageResponse = new MessageResponse();
        let messageDAO = await this.getMessageRepo.getMessageById(message.id!);
        if (!messageDAO.message) {
            messageResponse.status = ResponseStatus.error;
            messageResponse.messages.push(Messages.message.get.NotFoundError.fa);
            return messageResponse;
        }

        messageDAO = await this.updateMessageRepo.updateMessage(message);

        messageResponse.msg = new MessageModel();
        messageResponse.msg.fromDomainModel(messageDAO.message);
        messageResponse.status = ResponseStatus.success;
        messageResponse.messages.push(Messages.message.update.Success.fa);
        return messageResponse;
    }

}