import { UserModel } from "../models/UserModel";
import { LoginPostRequest } from "../request/LoginPostRequest";
import { ResponseBase } from "../response/ResponseBase";
import { ResponseStatus } from "../response/ResponseStatus";
import { HashUtil } from "../utils/HashUtil";

export class LoginController {

    private request: LoginPostRequest
    private model: typeof UserModel

    constructor(request: LoginPostRequest, model: typeof UserModel) {
        this.request = request
        this.model = model
    }

    async loginUser(): Promise<ResponseBase> {
        const response = new ResponseBase()

        const user = await this.model.findUserByEmail(this.request.email)
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