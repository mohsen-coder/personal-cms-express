import {FileResponse} from "./response/FileResponse";
import {File} from "../../../domain/File";

export interface CreateFileUseCase {
    createFile(file: File): Promise<FileResponse>
}