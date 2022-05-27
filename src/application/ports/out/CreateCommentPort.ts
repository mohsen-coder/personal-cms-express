import {CommentDAO} from "./dao/CommentDAO";

export interface CreateCommentPort{
    createComment(comment: CommentDAO): CommentDAO
}