import { RegisterRequest } from "../request/RegisterRequest";
import { UserModel } from "../models/UserModel";
import { ResponseBase } from "../response/ResponseBase";
import { ResponseStatus } from "../response/ResponseStatus";
import { HashUtil } from "../utils/HashUtil";
import { IRegisterController } from "../interfaces/IRegisterController";

export class RegisterController implements IRegisterController {

    private request: RegisterRequest 
    private model: typeof UserModel

    constructor(request: RegisterRequest, model: typeof UserModel) {
        this.request = request;
        this.model = model
    }

    private async checkUserExistOrNot(): Promise<boolean> {
        const user = await this.model.getUserByEmail(this.request.email)
        return user !== null
    }

    async registerUser(): Promise<ResponseBase> {
        const response = new ResponseBase()

        if(await this.checkUserExistOrNot()){
            response.messages.push('ایمیل موجود می باشد!')
            response.status = ResponseStatus.error
            return response
        }

        this.request.password = await HashUtil.hashPassword(this.request.password)
        
        this.model.create({...this.request})

        response.messages.push('کاربر با موفقیت ثبت شد!')
        response.status = ResponseStatus.success

        return response
    }
}