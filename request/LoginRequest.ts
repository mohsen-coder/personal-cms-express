export class LoginRequest {

    email: string = ''
    password: string = ''

    constructor(init: object) {
        Object.assign(this, init)
    }
    
}