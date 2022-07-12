import {Comment} from "../../../domain/Comment";
import {CommentDAO} from "./dao/CommentDAO";

export interface CreateCommentPort{
    createComment(comment: Comment): Promise<CommentDAO>
}