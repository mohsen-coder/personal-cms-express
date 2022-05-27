export class RegisterRequest {
    name: string
    family: string
    email: string
    password: string

    constructor(name: string, family: string, email: string, password: string) {
        this.name = name;
        this.family = family;
        this.email = email;
        this.password = password;
    }
}