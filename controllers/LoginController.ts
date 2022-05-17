import { ILoginController } from "../interfaces/ILoginController";
import { UserModel } from "../models/UserModel";
import { LoginRequest } from "../request/LoginRequest";
import { ResponseBase } from "../response/ResponseBase";
import { ResponseStatus } from "../response/ResponseStatus";
import { HashUtil } from "../utils/HashUtil";

export class LoginController implements ILoginController{

    private request: LoginRequest
    private model: typeof UserModel

    constructor(request: LoginRequest, model: typeof UserModel) {
        this.request = request
        this.model = model
    }

    async loginUser(): Promise<ResponseBase> {
        const response = new ResponseBase()

        const user = await this.model.getUserByEmail(this.request.email)
        if (user === null) {
            response.messages.push('شما هنوز ثبت نام نکردید!')
            response.status = ResponseStatus.error
            return response
        }

        if (!await HashUtil.comparePassword(this.request.password, user.password)) {
            response.messages.push('اطلاعات وارد شده صحیح نیست!')
            response.status = ResponseStatus.error
            return response
        }

        this.request.session.isLogin = true

        response.messages.push('با موفقیت وارد شدید!')
        response.status = ResponseStatus.success

        return response
    }

}