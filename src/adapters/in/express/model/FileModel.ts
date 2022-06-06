import {File} from "../../../../domain/File";
import {FileType} from "../../../../domain/FileType";

export class FileModel {
    id?: string
    size?: string
    title?: string
    meme?: string
    fileType?: string
    createAt?: number

    constructor(init?: any) {
        init && Object.assign(this, init);
    }

    toDomainModel(): File {
        const file = new File();
        file.id = this.id;
        file.size = this.size;
        file.meme = this.meme;

        if (this.createAt) file.createAt = new Date(this.createAt)

        switch (this.fileType) {
            case "":
                file.fileType = FileType.jpg;
                break;
            case "":
                file.fileType = FileType.jpeg;
                break;
            case "":
                file.fileType = FileType.png;
                break;
            case "":
                file.fileType = FileType.gif;
                break;
            default:
                file.fileType = FileType.none;
        }


        return file;
    }

    fromDomainModel(file: File) {
        this.id = file.id
        this.size = file.size
        this.title = file.title
        this.meme = file.meme
        this.fileType = file.fileType
        this.createAt = file.createAt?.getTime()
    }
}