import {EditCommentRequest} from "../request/EditCommentRequest";
import {CommentResponse} from "../response/CommentResponse";

export interface UpdateCommentUseCase {
    updateComment(request: EditCommentRequest): CommentResponse
}