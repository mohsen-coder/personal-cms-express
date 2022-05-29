import {GetFileRequest} from "./request/GetFileRequest";
import {FileResponse} from "./response/FileResponse";

export interface GetFileUseCase {
    getFile(request: GetFileRequest): Promise<FileResponse>
}