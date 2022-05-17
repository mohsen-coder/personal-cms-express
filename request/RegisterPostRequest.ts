export class RegisterPostRequest {

    name: string = ''
    family: string = ''
    email: string = ''
    password: string = ''

    constructor(init: object) {
        Object.assign(this, init)
    }
}