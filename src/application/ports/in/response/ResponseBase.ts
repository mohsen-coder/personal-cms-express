import {ResponseStatus} from "./ResponseStatus";

export class ResponseBase {
    status: ResponseStatus = ResponseStatus.none
    messages: string[] = []
}