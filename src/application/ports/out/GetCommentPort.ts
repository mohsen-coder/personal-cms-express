import {CommentDAO} from "./dao/CommentDAO";

export interface GetCommentPort {
    getCommentById(commentId: string): Promise<CommentDAO | null>

    getCommentsByPostId(postId: string): Promise<CommentDAO[]>

    getCommentsByStatus(commentStatus: string): Promise<CommentDAO[]>
}