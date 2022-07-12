import {ResponseBase} from "./ResponseBase";
import {PostModel} from "../../../../adapters/in/express/model/PostModel";

export class PostResponse extends ResponseBase {
    post: PostModel;
    posts: PostModel[];
    count: number;
}