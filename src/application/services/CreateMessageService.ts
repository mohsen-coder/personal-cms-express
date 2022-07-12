import {CreateMessagePort} from "../ports/out/CreateMessagePort";
import {CreateMessageUseCase} from "../ports/in/CreateMessageUseCase";
import {Message} from "../../domain/Message";
import {MessageResponse} from "../ports/in/response/MessageResponse";
import {MessageModel} from "../../adapters/in/express/model/MessageModel";
import {ResponseStatus} from "../ports/in/response/ResponseStatus";
import {Messages} from "../../../values/Messages";

export class CreateMessageService implements CreateMessageUseCase {

    constructor(
        private readonly createMessageRepo: CreateMessagePort
    ) {
    }

    async createMessage(messageArg: Message): Promise<MessageResponse> {
        const messageResponse = new MessageResponse();
        const messageDAO = await this.createMessageRepo.createMessage(messageArg);
        messageResponse.msg = new MessageModel();
        messageResponse.msg.fromDomainModel(messageDAO.message);
        messageResponse.status = ResponseStatus.success;
        messageResponse.messages.push(Messages.message.create.Success.fa);
        return messageResponse;
    }

}