export class CommentDAO {
    id?: string
    email!: string
    name!: string
    content!: string
    parentId?: { id: string }
    postId!: string
    status!: string
    createAt?: Date
    updateAt?: Date

    constructor(init: object) {
        Object.assign(this, init)
    }
}