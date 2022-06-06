import {GetAccountUseCase} from "../ports/in/GetAccountUseCase";
import {GetAccountPort} from "../ports/out/GetAccountPort";
import {AccountResponse} from "../ports/in/response/AccountResponse";
import {ResponseStatus} from "../ports/in/response/ResponseStatus";
import {Messages} from "../../../values/Messages";

export class GetAccountService implements GetAccountUseCase {

    constructor(
        private readonly getAccountRepo: GetAccountPort
    ) {
    }

    async getAccount(
        request: { id?: string, username?: string, email?: string, pagination?: { offset: number, limit: number } }
    ): Promise<AccountResponse> {
        const response = new AccountResponse()

        if (request.id || request.username || request.email) {
            let account;
            if (request.id) account = await this.getAccountRepo.getAccountById(request.id);
            else if (request.email) account = await this.getAccountRepo.getAccountByEmail(request.email);
            else account = await this.getAccountRepo.getAccountByUsername(request.username!);

            if (!account) {
                response.status = ResponseStatus.error
                response.messages.push(Messages.account.get.NotFoundError.fa)
                return response;
            }

            response.account = account;
            response.status = ResponseStatus.success
            response.messages.push(Messages.account.get.Success.fa)
            return response;
        }

        if (request.pagination) {
            response.accounts = await this.getAccountRepo.getAccounts(request.pagination.offset, request.pagination.limit);
            response.status = ResponseStatus.success
            response.messages.push(Messages.account.get.Success.fa)
            return response;
        }

        response.status = ResponseStatus.error
        response.messages.push(Messages.account.get.ParameterError.fa)
        return response;
    }
}