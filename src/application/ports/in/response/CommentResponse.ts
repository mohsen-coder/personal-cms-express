import {ResponseBase} from "./ResponseBase";
import {CommentModel} from "../../../../adapters/in/express/model/CommentModel";

export class CommentResponse extends ResponseBase {
    comment: CommentModel;
    comments: CommentModel[];
    count: number;
}