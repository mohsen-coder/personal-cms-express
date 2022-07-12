import {CommentStatus} from "./CommentStatus";
import {Post} from "./Post";

export class Comment {
    id: string
    parent: Comment
    children: Comment[]
    post: Post
    email: string
    name: string
    content: string
    status: CommentStatus
    createAt: Date
    updateAt: Date
}