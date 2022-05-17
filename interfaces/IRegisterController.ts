import { ResponseBase } from "../response/ResponseBase";

export interface IRegisterController{
    registerUser(): Promise<ResponseBase>
}