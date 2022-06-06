import {Comment} from "../../../domain/Comment";

export interface UpdateCommentPort {
    updateComment(comment: Comment): Promise<Comment>
}