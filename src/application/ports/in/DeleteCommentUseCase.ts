import {ResponseBase} from "./response/ResponseBase";

export interface DeleteCommentUseCase {
    deleteComment(commentId: string): Promise<ResponseBase>
}