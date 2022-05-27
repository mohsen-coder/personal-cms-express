import {CommentDAO} from "./dao/CommentDAO";

export interface UpdateCommentPort {
    updateComment(comment: CommentDAO): CommentDAO
}