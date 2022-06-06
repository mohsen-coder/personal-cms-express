import {ResponseBase} from "./response/ResponseBase";

export interface DeleteFileUseCase {
    deleteFile(fileId: string): Promise<ResponseBase>
}