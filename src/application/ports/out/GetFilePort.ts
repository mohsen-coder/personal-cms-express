import {File} from "../../../domain/File";

export interface GetFilePort {
    getFileById(fileId: string): Promise<File | null>
}