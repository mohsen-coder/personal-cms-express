import {File} from "../../../domain/File";
import {FileDAO} from "./dao/FileDAO";

export interface CreateFilePort {
    createFile(file: File): Promise<FileDAO>
}