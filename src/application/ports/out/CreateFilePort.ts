import {File} from "../../../domain/File";

export interface CreateFilePort {
    createFile(file: File): Promise<File>
}