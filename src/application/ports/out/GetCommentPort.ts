import {Comment} from "../../../domain/Comment";

export interface GetCommentPort {
    getCommentById(commentId: string): Promise<Comment | null>

    getCommentsByPostId(postId: string): Promise<Comment[]>

    getCommentsByStatus(commentStatus: string): Promise<Comment[]>
}