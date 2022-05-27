import {NewCommentRequest} from "../request/NewCommentRequest";
import {CommentResponse} from "../response/CommentResponse";

export interface CreateCommentUseCase {
    createComment(request: NewCommentRequest): CommentResponse
}