import { Message } from "../../../../domain/Message";
import { MessageStatus } from "../../../../domain/MessageStatus";
import { FileModel } from "./FileModel";

export class MessageModel {
    id: string
    name: string
    email: string
    webSite: string
    title: string
    content: string
    status: string
    reply: MessageModel
    parent: MessageModel
    file: FileModel
    createAt: number
    updateAt: number

    constructor(init?: any) {
        init && Object.assign(this, init)
        if (init && init.file) this.file = new FileModel(init.file)
        if (init && init.reply) this.reply = new MessageModel(this.reply);
        if (init && init.parent) this.parent = new MessageModel(this.parent);
    }

    toDomainModel(): Message {
        const message = new Message()
        if(this.id) message.id = this.id;
        message.name = this.name;
        message.email = this.email;
        if (this.webSite) message.webSite = this.webSite;
        message.title = this.title;
        message.content = this.content;
        if (this.reply) message.reply = this.reply.toDomainModel();
        if(this.parent) message.parent = this.parent.toDomainModel();
        switch (this.status) {
            case "read":
                message.status = MessageStatus.read;
                break;
            default:
                message.status = MessageStatus.unread;
        }
        if (this.file) message.file = this.file.toDomainModel();

        return message;
    }

    fromDomainModel(message: Message) {
        if(message.id) this.id = message.id;
        if(message.name) this.name = message.name;
        if(message.email) this.email = message.email;
        if(message.webSite) this.webSite = message.webSite;
        if(message.title) this.title = message.title;
        if(message.content) this.content = message.content;
        if(message.createAt) this.createAt = message.createAt.getTime();
        if(message.updateAt) this.updateAt = message.updateAt.getTime();
        if(message.status) this.status = message.status;

        if (message.reply) {
            this.reply = new MessageModel();
            this.reply.fromDomainModel(message.reply);
        }

        if(message.parent){
            this.parent = new MessageModel();
            this.parent.fromDomainModel(message.parent);
        }

        if (message.file) {
            this.file = new FileModel()
            this.file.fromDomainModel(message.file)
        }

    }
}