import {FileType} from "./FileType";

export class File {
    id: string = ""
    size: string = ""
    title: string = ""
    meme: string = ""
    fileType: FileType = FileType.none

    constructor(init: object | null) {
        init && Object.assign(this, init)
    }
}