import {ResponseBase} from "./ResponseBase";

export class PostResponse extends ResponseBase {
    post: object | null = null
    posts: object[] | null = null
}