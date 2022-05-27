import {CommentDAO} from "./dao/CommentDAO";

export interface GetCommentPort {
    getCommentById(commentId: string): CommentDAO

    getCommentsByPostId(postId: string): CommentDAO[]

    getCommentsByStatus(commentStatus: string): CommentDAO[]
}