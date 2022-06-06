import {CommentResponse} from "./response/CommentResponse";

export interface GetCommentUseCase {
    getComment(request: { id?: string, postId?: string }): Promise<CommentResponse>
}