import {LoginUseCase} from "../ports/in/LoginUseCase";
import {GetAccountPort} from "../ports/out/GetAccountPort";
import {LoginResponse} from "../ports/in/response/LoginResponse";
import {ResponseStatus} from "../ports/in/response/ResponseStatus";
import {Messages} from "../../../values/Messages";
import {Bcrypt} from "../../utils/Bcrypt";
import {JWT} from "../../utils/JWT";

export class LoginService implements LoginUseCase {

    constructor(
        private readonly accountRepo: GetAccountPort,
        private readonly JWTUtil: typeof JWT,
        private readonly BcryptUtil: typeof Bcrypt
    ) {
    }

    async login(request: { username: string; password: string }): Promise<LoginResponse> {
        const loginResponse = new LoginResponse();

        const accountDAO = await this.accountRepo.getAccountByUsername(request.username);
        if (!accountDAO.account) {
            loginResponse.status = ResponseStatus.error;
            loginResponse.messages.push(Messages.login.UsernameError.fa);
            return loginResponse;
        }

        if (!this.BcryptUtil.comparePassword(request.password, accountDAO.account.password!)) {
            loginResponse.status = ResponseStatus.error;
            loginResponse.messages.push(Messages.login.PasswordError.fa);
            return loginResponse;
        }


        loginResponse.token = this.JWTUtil.generateToken({
            accountId: accountDAO.account.id,
            username: accountDAO.account.username,
            name: accountDAO.account.name,
            family: accountDAO.account.family,
            email: accountDAO.account.email,
            role: accountDAO.account.role
        }, '12h');
        loginResponse.status = ResponseStatus.success;
        loginResponse.messages.push(Messages.login.Success.fa);
        return loginResponse;
    }
}