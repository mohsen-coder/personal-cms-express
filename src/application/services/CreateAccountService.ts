import {RegisterUseCase} from "../ports/in/RegisterUseCase";
import {CreateAccountPort} from "../ports/out/CreateAccountPort";
import {ResponseBase} from "../ports/in/response/ResponseBase";
import {Account} from "../../domain/Account";
import {GetAccountPort} from "../ports/out/GetAccountPort";
import {ResponseStatus} from "../ports/in/response/ResponseStatus";
import {Messages} from "../../../values/Messages";
import {Bcrypt} from "../../utils/Bcrypt";

export class CreateAccountService implements RegisterUseCase {


    constructor(
        private readonly createAccountRepo: CreateAccountPort,
        private readonly getAccountRepo: GetAccountPort,
        private readonly BcryptUtil: typeof Bcrypt
    ) {
    }

    async register(accountArg: Account): Promise<ResponseBase> {

        const accountDAOByEmail = await this.getAccountRepo.getAccountByEmail(accountArg.email!)
        const accountDAOByUsername = await this.getAccountRepo.getAccountByUsername(accountArg.username!)

        const response = new ResponseBase()

        if (accountDAOByEmail.account || accountDAOByUsername.account) {
            response.status = ResponseStatus.error;
            response.messages.push(Messages.account.get.ExistError.fa)
            return response;
        }

        accountArg.password = this.BcryptUtil.hashPassword(accountArg.password!)

        await this.createAccountRepo.createAccount(accountArg)

        response.status = ResponseStatus.success;
        response.messages.push(Messages.account.create.Success.fa)
        return response;
    }

}