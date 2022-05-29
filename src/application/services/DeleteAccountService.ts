import {DeleteAccountUseCase} from "../ports/in/DeleteAccountUseCase";
import {DeleteAccountPort} from "../ports/out/DeleteAccountPort";
import {GetAccountPort} from "../ports/out/GetAccountPort";
import {DeleteAccountRequest} from "../ports/in/request/DeleteAccountRequest";
import {ResponseBase} from "../ports/in/response/ResponseBase";
import {ResponseStatus} from "../ports/in/response/ResponseStatus";
import {Messages} from "../../../values/Messages";

export class DeleteAccountService implements DeleteAccountUseCase {

    private readonly deleteAccountRepo: DeleteAccountPort
    private readonly getAccountRepo: GetAccountPort

    constructor(deleteAccountRepo: DeleteAccountPort, getAccountRepo: GetAccountPort) {
        this.deleteAccountRepo = deleteAccountRepo;
        this.getAccountRepo = getAccountRepo;
    }

    async deleteAccount(request: DeleteAccountRequest): Promise<ResponseBase> {
        const accountExist = await this.getAccountRepo.getAccountById(request.accountId)

        const response = new ResponseBase()
        if (!accountExist){
            response.status = ResponseStatus.error;
            response.messages.push(Messages.account.delete.NotFoundError.fa)
            return response;
        }

        const isDeleteSuccessful = await this.deleteAccountRepo.deleteAccount(request.accountId)
        if (!isDeleteSuccessful){
            response.status = ResponseStatus.error;
            response.messages.push(Messages.account.delete.SomethingWentWrongError.fa)
            return response;
        }

        response.status = ResponseStatus.success;
        response.messages.push(Messages.account.delete.Success.fa)
        return response;
    }

}