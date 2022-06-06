import {FileResponse} from "./response/FileResponse";

export interface GetFileUseCase {
    getFile(request: {id?: string}): Promise<FileResponse>
}