import {FileDAO} from "./dao/FileDAO";

export interface CreateFilePort {
    createFile(file: FileDAO): FileDAO
}