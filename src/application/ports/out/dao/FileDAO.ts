export class FileDAO {
    id?: string
    size!: string
    title!: string
    meme!: string
    fileType!: string
    createAt?: string

    constructor(init: object) {
        Object.assign(this, init)
    }
}