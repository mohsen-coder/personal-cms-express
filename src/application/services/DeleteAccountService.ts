import {DeleteAccountUseCase} from "../ports/in/DeleteAccountUseCase";
import {DeleteAccountPort} from "../ports/out/DeleteAccountPort";
import {GetAccountPort} from "../ports/out/GetAccountPort";
import {ResponseBase} from "../ports/in/response/ResponseBase";
import {ResponseStatus} from "../ports/in/response/ResponseStatus";
import {Messages} from "../../../values/Messages";

export class DeleteAccountService implements DeleteAccountUseCase {

    constructor(
        private readonly deleteAccountRepo: DeleteAccountPort,
        private readonly getAccountRepo: GetAccountPort
    ) {
    }

    async deleteAccount(
        request: { id?: string, username?: string, email?: string }
    ): Promise<ResponseBase> {
        const response = new ResponseBase()
        let isDeleteSuccessful;

        if (request.id) isDeleteSuccessful = await this.deleteAccountRepo.deleteAccountById(request.id)
        else if (request.email) isDeleteSuccessful = await this.deleteAccountRepo.deleteAccountByEmail(request.email)
        else if (request.username) isDeleteSuccessful = await this.deleteAccountRepo.deleteAccountByUsername(request.username)

        if (!isDeleteSuccessful) {
            response.status = ResponseStatus.error;
            response.messages.push(Messages.account.delete.SomethingWentWrongError.fa)
            return response;
        }

        response.status = ResponseStatus.success;
        response.messages.push(Messages.account.delete.Success.fa)
        return response;
    }

}