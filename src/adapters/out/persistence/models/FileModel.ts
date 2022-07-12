import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryColumn,
} from "typeorm";
import {File} from "../../../../domain/File";
import {FileMimeType} from "../../../../domain/FileMimeType";

@Entity()
export class FileModel extends BaseEntity {
    @PrimaryColumn({unique: true, nullable: false}) id: string;
    @Column() size: string;
    @Column() name: string;
    @Column() mimeType: string;
    @CreateDateColumn() createAt: Date;

    toDomainModel(): File {
        const file = new File();

        if (this.id) file.id = this.id;
        if (this.size) file.size = this.size;
        if (this.name) file.name = this.name;
        if (this.createAt) file.createAt = this.createAt;

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
}
