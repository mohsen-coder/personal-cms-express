import {Comment} from "../../../domain/Comment";

export interface CreateCommentPort{
    createComment(comment: Comment): Promise<Comment>
}