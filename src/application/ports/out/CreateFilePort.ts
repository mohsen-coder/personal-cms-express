import {FileDAO} from "./dao/FileDAO";

export interface CreateFilePort {
    createFile(file: FileDAO): Promise<FileDAO>
}