import {Comment} from "../../../domain/Comment";
import {CommentDAO} from "./dao/CommentDAO";

export interface GetCommentPort {
    getCommentById(commentId: string): Promise<CommentDAO>

    getCommentsByStatusAndPostId(postId: string, status: string, offset: number, limit: number): Promise<CommentDAO>

    getCommentsByStatus(commentStatus: string, offset: number, limit: number): Promise<CommentDAO>
}