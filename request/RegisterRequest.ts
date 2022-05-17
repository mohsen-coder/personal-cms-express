export class RegisterRequest {

    name: string = ''
    family: string = ''
    email: string = ''
    password: string = ''
    confirmPassword: string = ''

    constructor(init: object) {
        Object.assign(this, init)
    }
}