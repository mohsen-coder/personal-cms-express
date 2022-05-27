import {ResponseBase} from "./ResponseBase";

export class CommentResponse extends ResponseBase {
    comment: object | null = null
    comments: object[] | null = null
}