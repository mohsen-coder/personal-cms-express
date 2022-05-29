import {UpdateAccountUseCase} from "../ports/in/UpdateAccountUseCase";
import {UpdateAccountPort} from "../ports/out/UpdateAccountPort";
import {EditAccountRequest} from "../ports/in/request/EditAccountRequest";
import {AccountResponse} from "../ports/in/response/AccountResponse";
import {Account} from "../../domain/Account";
import {GetAccountPort} from "../ports/out/GetAccountPort";
import {ResponseStatus} from "../ports/in/response/ResponseStatus";
import {Messages} from "../../../values/Messages";
import {AccountDAO} from "../ports/out/dao/AccountDAO";

export class UpdateAccountService implements UpdateAccountUseCase {

    private readonly updateAccountRepo: UpdateAccountPort
    private readonly getAccountRepo: GetAccountPort

    constructor(updateAccountRepo: UpdateAccountPort, getAccountRepo: GetAccountPort) {
        this.updateAccountRepo = updateAccountRepo;
        this.getAccountRepo = getAccountRepo;
    }

    async updateAccount(request: EditAccountRequest): Promise<AccountResponse> {
        const account = new Account(request)

        const accountExist = await this.getAccountRepo.getAccountByUsername(account.username)

        const response = new AccountResponse()
        if (!accountExist) {
            response.status = ResponseStatus.error
            response.messages.push(Messages.account.update.NotFoundError.fa)
            return response;
        }

        const accountDAO = new AccountDAO(account);
        response.account = await this.updateAccountRepo.updateAccount(accountDAO)
        response.status = ResponseStatus.success
        response.messages.push(Messages.account.update.Success.fa)
        return response;
    }

}