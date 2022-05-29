import {RegisterUseCase} from "../ports/in/RegisterUseCase";
import {CreateAccountPort} from "../ports/out/CreateAccountPort";
import {RegisterRequest} from "../ports/in/request/RegisterRequest";
import {ResponseBase} from "../ports/in/response/ResponseBase";
import {Account} from "../../domain/Account";
import {AccountRole} from "../../domain/AccountRole";
import {GetAccountPort} from "../ports/out/GetAccountPort";
import {ResponseStatus} from "../ports/in/response/ResponseStatus";
import {Messages} from "../../../values/Messages";

export class CreateAccountService implements RegisterUseCase {

    private readonly createAccount: CreateAccountPort
    private readonly getAccount: GetAccountPort

    constructor(createAccount: CreateAccountPort, getAccount: GetAccountPort) {
        this.createAccount = createAccount;
        this.getAccount = getAccount;
    }

    async register(request: RegisterRequest): Promise<ResponseBase> {

        const account = new Account(request)
        account.role = AccountRole.user

        const usernameExist = await this.getAccount.getAccountByUsername(account.username)
        const emailExist = await this.getAccount.getAccountByEmail(account.email)

        const response = new ResponseBase()
        if (usernameExist || emailExist) {
            response.status = ResponseStatus.error;
            response.messages.push(Messages.account.create.AccountExistError.fa)
            return response;
        }

        response.status = ResponseStatus.success;
        response.messages.push(Messages.account.create.Success.fa)
        return response;
    }

}