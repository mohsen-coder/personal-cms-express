import {GetMessagePort} from "../ports/out/GetMessagePort";
import {GetMessageUseCase} from "../ports/in/GetMessageUseCase";
import {MessageResponse} from "../ports/in/response/MessageResponse";
import {ResponseStatus} from "../ports/in/response/ResponseStatus";
import {Messages} from "../../../values/Messages";
import {MessageModel} from "../../adapters/in/express/model/MessageModel";
import {MessageDAO} from "../ports/out/dao/MessageDAO";

export class GetMessageService implements GetMessageUseCase {

    constructor(
        private readonly getMessageRepo: GetMessagePort
    ) {
    }

    async getMessage(request: {messageId?: string, email?: string,status?: string, offset?: number, limit?: number}): Promise<MessageResponse> {
        const messageResponse = new MessageResponse()

        let messageDAO: MessageDAO;
        if (request.messageId) {
            messageDAO = await this.getMessageRepo.getMessageById(request.messageId);

            if (!messageDAO.message) {
                messageResponse.status = ResponseStatus.error;
                messageResponse.messages.push(Messages.message.get.NotFoundError.fa)
                return messageResponse;
            }

            messageResponse.msg = new MessageModel();
            messageResponse.msg.fromDomainModel(messageDAO.message);
            messageResponse.count = 1;
            messageResponse.status = ResponseStatus.success;
            messageResponse.messages.push(Messages.message.get.Success.fa);
            return messageResponse;
        }

        if ((request.email) || (request.status && request.limit && request.limit > 0)){
            if(request.email) messageDAO = await this.getMessageRepo.getMessagesByEmail(request.email);
            else messageDAO = await this.getMessageRepo.getMessageByStatus(request.status!, request.offset!, request.limit!);
            messageResponse.msgs = messageDAO.messages.map(message => {
                const messageModel = new MessageModel()
                messageModel.fromDomainModel(message)
                return messageModel;
            });
            messageResponse.count = messageDAO.count;
            messageResponse.status = ResponseStatus.success;
            messageResponse.messages.push(Messages.message.get.Success.fa);
            return messageResponse;
        }

        messageResponse.status = ResponseStatus.error;
        messageResponse.messages.push(Messages.message.get.ParameterError.fa)
        return messageResponse;
    }
}