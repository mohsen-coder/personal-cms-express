import {UploadFileRequest} from "../request/UploadFileRequest";
import {FileResponse} from "../response/FileResponse";

export interface CreateFileUseCase {
    createFile(request: UploadFileRequest): FileResponse
}