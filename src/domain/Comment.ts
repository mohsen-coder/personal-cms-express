import {CommentStatus} from "./CommentStatus";

export class Comment {
    id?: string
    parentId?: string
    email?: string
    name?: string
    content?: string
    status!: CommentStatus
    createAt?: Date
    updateAt?: Date
}