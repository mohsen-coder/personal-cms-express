import {CommentResponse} from "./response/CommentResponse";

export interface GetCommentUseCase {
    getComment(request: { id?: string, postId?: string, status?: string, offset?: number, limit?: number }): Promise<CommentResponse>
}