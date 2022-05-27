import {DeleteFileRequest} from "./request/DeleteFileRequest";
import {ResponseBase} from "./response/ResponseBase";

export interface DeleteFileUseCase {
    deleteFile(request: DeleteFileRequest): ResponseBase
}