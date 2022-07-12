import {ResponseBase} from "./ResponseBase";
import {MessageModel} from "../../../../adapters/in/express/model/MessageModel";

export class MessageResponse extends ResponseBase {
    msg: MessageModel;
    msgs: MessageModel[];
    count: number;
}