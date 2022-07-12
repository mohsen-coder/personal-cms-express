import {File} from "../../../domain/File";
import {FileDAO} from "./dao/FileDAO";

export interface GetFilePort {
    getFileById(fileId: string): Promise<FileDAO>
}