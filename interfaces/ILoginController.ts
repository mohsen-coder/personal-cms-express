import { ResponseBase } from "../response/ResponseBase";

export interface ILoginController {
    loginUser(): Promise<ResponseBase>
}