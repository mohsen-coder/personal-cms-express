import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity, JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {Message} from "../../../../domain/Message";
import {MessageStatus} from "../../../../domain/MessageStatus";
import {FileModel} from "./FileModel";

@Entity()
export class MessageModel extends BaseEntity {
    @PrimaryGeneratedColumn("uuid") id: string;
    @Column() name: string;
    @Column({nullable: true}) email: string;
    @Column({nullable: true}) title: string;
    @Column({nullable: true}) webSite: string;
    @Column() content: string;
    @Column() status: string;

    @OneToOne(() => FileModel, {onDelete: "CASCADE", nullable: true})
    @JoinColumn()
    file: FileModel | null;

    @OneToOne(() => MessageModel, {nullable: true, onDelete: "CASCADE"})
    @JoinColumn()
    reply: MessageModel | null;

    @OneToOne(() => MessageModel, {nullable: true, onDelete: "CASCADE"})
    @JoinColumn()
    parent: MessageModel | null;

    @CreateDateColumn() createAt: Date;
    @UpdateDateColumn() updateAt: Date;

    toDomainModel(): Message {
        const message = new Message();

        if (this.id) message.id = this.id
        if (this.name) message.name = this.name
        if (this.email) message.email = this.email
        if (this.webSite) message.webSite = this.webSite
        if (this.title) message.title = this.title
        if (this.content) message.content = this.content
        if (this.createAt) message.createAt = this.createAt
        if (this.updateAt) message.updateAt = this.updateAt
        if (this.reply) message.reply = this.reply.toDomainModel();
        switch (this.status) {
            case "read":
                message.status = MessageStatus.read;
                break;
            default:
                message.status = MessageStatus.unread;
        }

        if (this.file) message.file = this.file.toDomainModel()

        return message;
    }
}