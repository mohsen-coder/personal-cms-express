import {Comment} from "../../../domain/Comment";
import {CommentDAO} from "./dao/CommentDAO";

export interface UpdateCommentPort {
    updateComment(comment: Comment): Promise<CommentDAO>
}