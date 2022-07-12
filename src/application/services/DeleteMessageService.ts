import {DeleteMessageUseCase} from "../ports/in/DeleteMessageUseCase";
import {GetMessagePort} from "../ports/out/GetMessagePort";
import {DeleteMessagePort} from "../ports/out/DeleteMessagePort";
import {ResponseBase} from "../ports/in/response/ResponseBase";
import {ResponseStatus} from "../ports/in/response/ResponseStatus";
import {Messages} from "../../../values/Messages";

export class DeleteMessageService implements DeleteMessageUseCase {

    constructor(
        private readonly deleteMessageRepo: DeleteMessagePort
    ) {
    }

    async deleteMessage(messageId: string): Promise<ResponseBase> {
        const responseBase = new ResponseBase()

        if (await this.deleteMessageRepo.deleteMessage(messageId)) {
            responseBase.status = ResponseStatus.success;
            responseBase.messages.push(Messages.message.delete.Success.fa)
            return responseBase;
        }

        responseBase.status = ResponseStatus.error;
        responseBase.messages.push(Messages.message.delete.SomethingWentWrongError.fa)
        return responseBase;
    }

}