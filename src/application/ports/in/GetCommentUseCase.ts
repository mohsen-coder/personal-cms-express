import {GetCommentRequest} from "../request/GetCommentRequest";
import {CommentResponse} from "../response/CommentResponse";

export interface GetCommentUseCase {
    getComment(request: GetCommentRequest): CommentResponse
}