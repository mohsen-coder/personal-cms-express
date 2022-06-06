import {BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from "typeorm";
import {File} from "../../../../domain/File";
import {FileType} from "../../../../domain/FileType";

@Entity()
export class FileModel extends BaseEntity {
    @PrimaryGeneratedColumn("uuid") id!: string
    @Column() size!: string
    @Column() title!: string
    @Column() meme!: string
    @Column() fileType!: string
    @CreateDateColumn() createAt!: Date

    toDomainModel(): File {
        const file = new File()
        file.id = this.id!
        file.size = this.size
        file.title = this.title
        file.meme = this.meme
        file.createAt = this.createAt

        switch (this.fileType) {
            case "jpg":
                file.fileType = FileType.jpg;
                break;
            case "jpeg":
                file.fileType = FileType.jpeg;
                break;
            case "png":
                file.fileType = FileType.png;
                break;
            case "gif":
                file.fileType = FileType.gif;
                break;
            default:
                file.fileType = FileType.none;
        }

        return file;
    }
}