import {DeleteCommentRequest} from "../request/DeleteCommentRequest";
import {ResponseBase} from "../response/ResponseBase";

export interface DeleteCommentUseCase {
    deleteComment(request: DeleteCommentRequest): ResponseBase
}