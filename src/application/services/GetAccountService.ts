import {GetAccountUseCase} from "../ports/in/GetAccountUseCase";
import {GetAccountPort} from "../ports/out/GetAccountPort";
import {AccountResponse} from "../ports/in/response/AccountResponse";
import {ResponseStatus} from "../ports/in/response/ResponseStatus";
import {Messages} from "../../../values/Messages";
import {AccountModel} from "../../adapters/in/express/model/AccountModel";
import {AccountDAO} from "../ports/out/dao/AccountDAO";

export class GetAccountService implements GetAccountUseCase {

    constructor(
        private readonly getAccountRepo: GetAccountPort
    ) {
    }

    async getAccount(
        request: { id?: string, username?: string, email?: string, pagination?: { offset: number, limit: number } }
    ): Promise<AccountResponse> {
        const response = new AccountResponse()
        let accountDAO: AccountDAO;

        if (request.id || request.username || request.email) {
            if (request.id) accountDAO = await this.getAccountRepo.getAccountById(request.id);
            else if (request.email) accountDAO = await this.getAccountRepo.getAccountByEmail(request.email);
            else accountDAO = await this.getAccountRepo.getAccountByUsername(request.username!);

            if (!accountDAO.account) {
                response.status = ResponseStatus.error
                response.messages.push(Messages.account.get.NotFoundError.fa)
                return response;
            }

            response.account = new AccountModel();
            response.account.fromDomainModel(accountDAO.account);
            response.status = ResponseStatus.success
            response.count = 1;
            response.messages.push(Messages.account.get.Success.fa)
            return response;
        }

        if (request.pagination) {
            accountDAO = await this.getAccountRepo.getAccounts(request.pagination.offset, request.pagination.limit)
            if (accountDAO.accounts) {
                response.accounts = accountDAO.accounts.map(account => {
                    const accountModel = new AccountModel();
                    accountModel.fromDomainModel(account)
                    return accountModel;
                });
                response.count = accountDAO.count;
            }
            response.status = ResponseStatus.success
            response.messages.push(Messages.account.get.Success.fa)
            return response;
        } else {
            response.accounts = [];
            response.count = 0;
        }

        response.status = ResponseStatus.error
        response.messages.push(Messages.account.get.ParameterError.fa)
        return response;
    }
}