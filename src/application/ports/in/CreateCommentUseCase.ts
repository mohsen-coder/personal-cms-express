import {CommentResponse} from "./response/CommentResponse";
import {Comment} from "../../../domain/Comment";

export interface CreateCommentUseCase {
    createComment(comment: Comment): Promise<CommentResponse>
}