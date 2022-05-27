import {DeletePostRequest} from "../request/DeletePostRequest";
import {ResponseBase} from "../response/ResponseBase";

export interface DeletePostUseCase {
    deletePost(request: DeletePostRequest): ResponseBase
}