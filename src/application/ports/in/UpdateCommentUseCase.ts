import {CommentResponse} from "./response/CommentResponse";
import {Comment} from "../../../domain/Comment";

export interface UpdateCommentUseCase {
    updateComment(comment: Comment): Promise<CommentResponse>
}