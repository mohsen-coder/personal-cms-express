import {UpdateAccountUseCase} from "../ports/in/UpdateAccountUseCase";
import {UpdateAccountPort} from "../ports/out/UpdateAccountPort";
import {AccountResponse} from "../ports/in/response/AccountResponse";
import {Account} from "../../domain/Account";
import {GetAccountPort} from "../ports/out/GetAccountPort";
import {ResponseStatus} from "../ports/in/response/ResponseStatus";
import {Messages} from "../../../values/Messages";
import {AccountModel} from "../../adapters/in/express/model/AccountModel";

export class UpdateAccountService implements UpdateAccountUseCase {

    constructor(
        private readonly updateAccountRepo: UpdateAccountPort,
        private readonly getAccountRepo: GetAccountPort
    ) {
    }

    async updateAccount(account: Account): Promise<AccountResponse> {
        let accountDAO = await this.getAccountRepo.getAccountById(account.id!)

        const response = new AccountResponse()
        if (!accountDAO.account) {
            response.status = ResponseStatus.error
            response.messages.push(Messages.account.get.NotFoundError.fa)
            return response;
        }

        accountDAO = await this.updateAccountRepo.updateAccount(account);

        response.account = new AccountModel();
        response.account.fromDomainModel(accountDAO.account);
        response.status = ResponseStatus.success;
        response.messages.push(Messages.account.update.Success.fa);
        return response;
    }

}