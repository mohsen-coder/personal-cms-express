export class PostDAO {
    id?: string
    thumbnail?: { id: string }
    title!: string
    content!: string
    fullContent!: string
    categories?: { id: string }[]
    tags?: string[]
    comments?: { id: string }[]
    author!: { id: string }
    view: number = 0
    like: number = 0
    publishDate!: Date
    status!: string

    constructor(init: object) {
        Object.assign(this, init)
    }
}