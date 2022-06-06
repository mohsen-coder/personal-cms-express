import {ResponseBase} from "./ResponseBase";
import {Post} from "../../../../domain/Post";

export class PostResponse extends ResponseBase {
    post?: Post
    posts?: Post[]
}