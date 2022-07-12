import {FileMimeType} from "./FileMimeType";

export class File {
    id: string
    size: string
    name: string
    mimeType: FileMimeType
    createAt: Date
}