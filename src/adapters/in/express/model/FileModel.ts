import {File} from "../../../../domain/File";
import {FileMimeType} from "../../../../domain/FileMimeType";

export class FileModel {
    id: string
    size: string
    name: string
    mimeType: string
    createAt: number

    constructor(init?: any) {
        init && Object.assign(this, init);
    }

    toDomainModel(): File {
        const file = new File();
        if(this.id) file.id = this.id;
        if(this.name) file.name = this.name;
        if(this.size) file.size = this.size;
        if (this.createAt) file.createAt = new Date(this.createAt);

        switch (this.mimeType) {
            case "image/jpeg":
                file.mimeType = FileMimeType.jpg;
                break;
            case "image/png":
                file.mimeType = FileMimeType.png;
                break;
            case "image/gif":
                file.mimeType = FileMimeType.gif;
                break;
            case "application/pdf":
                file.mimeType = FileMimeType.pdf;
                break;
            case "application/zip":
                file.mimeType = FileMimeType.zip;
                break;
            case "text/plain":
                file.mimeType = FileMimeType.text;
                break;
            case "application/vnd.rar":
                file.mimeType = FileMimeType.rar;
                break;
            default:
                file.mimeType = FileMimeType.none;
        }
        return file;
    }

    fromDomainModel(file: File) {
        this.id = file.id;
        if(file.size) this.size = file.size;
        if(file.name) this.name = file.name;
        if(file.mimeType) this.mimeType = file.mimeType;
        if(file.createAt) this.createAt = file.createAt.getTime();
    }
}