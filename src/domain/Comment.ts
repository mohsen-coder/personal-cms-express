export class Comment {
    id: string = ""
    email: string = ""
    name: string = ""
    content: string = ""
    createDate: number = 0

    constructor(init: object | null) {
        init && Object.assign(this, init)
    }
}