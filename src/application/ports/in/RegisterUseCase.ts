import {ResponseBase} from "./response/ResponseBase";
import {Account} from "../../../domain/Account";

export interface RegisterUseCase {
    register(request: Account): Promise<ResponseBase>
}