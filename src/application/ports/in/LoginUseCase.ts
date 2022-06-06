import {LoginResponse} from "./response/LoginResponse";

export interface LoginUseCase {
    login(request: {username: string, password: string}): Promise<LoginResponse>
}