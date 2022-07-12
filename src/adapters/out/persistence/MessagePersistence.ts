import {MessageModel} from "./models/MessageModel";
import {CreateMessagePort} from "../../../application/ports/out/CreateMessagePort";
import {GetMessagePort} from "../../../application/ports/out/GetMessagePort";
import {UpdateMessagePort} from "../../../application/ports/out/UpdateMessagePort";
import {DeleteMessagePort} from "../../../application/ports/out/DeleteMessagePort";
import {Message} from "../../../domain/Message";
import {FileModel} from "./models/FileModel";
import {MessageDAO} from "../../../application/ports/out/dao/MessageDAO";
import log from "../../../utils/logger";

export class MessagePersistence implements CreateMessagePort, GetMessagePort, UpdateMessagePort, DeleteMessagePort {

    constructor(
        private readonly messageModel: typeof MessageModel,
        private readonly fileModel: typeof FileModel
    ) {
    }

    async createMessage(messageArg: Message): Promise<MessageDAO> {
        const message = new MessageModel();
        message.name = messageArg.name!;
        if (messageArg.email) message.email = messageArg.email;
        if (messageArg.webSite) message.webSite = messageArg.webSite;
        if (messageArg.title) message.title = messageArg.title;
        message.content = messageArg.content!;
        message.status = messageArg.status!;
        let parent = null;

        if (messageArg.parent) {
            parent = await this.messageModel.createQueryBuilder("message")
                .where("message.id = :messageId", {messageId: messageArg.parent.id})
                .getOne();
            parent!.status = "read";
            message.parent = parent!;
        }

        if (messageArg.file) {
            const file = await this.fileModel.createQueryBuilder("file")
                .where("file.id = :fileId", {fileId: messageArg.file.id})
                .getOne();
            message.file = file!;
        }

        const savedMessage = await message.save()

        if (messageArg.parent) {
            parent!.reply = savedMessage;
            await this.messageModel.save(parent!)
        }

        const messageDAO = new MessageDAO();
        messageDAO.message = savedMessage.toDomainModel();
        return messageDAO;
    }

    async getMessagesByEmail(email: string): Promise<MessageDAO> {
        const [messages, count] = await this.messageModel.createQueryBuilder("message")
            .leftJoinAndSelect("message.file", "file")
            .leftJoinAndSelect("message.reply", "reply")
            .where("message.email = :email", {email})
            .andWhere("message.parent IS NULL")
            .select([
                "message",
                "reply",
                "file.id"
            ])
            .getManyAndCount();
        const messageDAO = new MessageDAO();
        messageDAO.messages = messages.map(message => {
            return message.toDomainModel();
        });
        messageDAO.count = count;
        return messageDAO;
    }

    async getMessageById(messageId: string): Promise<MessageDAO> {
        const message = await this.messageModel.createQueryBuilder("message")
            .leftJoinAndSelect("message.file", "file")
            .leftJoinAndSelect("message.reply", "reply")
            .where("message.id = :messageId", {messageId})
            .getOne();
        const messageDAO = new MessageDAO();
        if (message) messageDAO.message = message.toDomainModel();
        return messageDAO;
    }

    async getMessageByStatus(status: string, offset: number, limit: number): Promise<MessageDAO> {
        const [messages, count] = await this.messageModel.createQueryBuilder("message")
            .leftJoinAndSelect("message.file", "file")
            .leftJoinAndSelect("message.reply", "reply")
            .where("message.status = :status", {status: status})
            .andWhere("message.parent IS NULL")
            .select([
                "message",
                "reply",
                "file.id"
            ])
            .skip(offset)
            .take(limit)
            .getManyAndCount()

        const messageDAO = new MessageDAO();
        messageDAO.messages = messages.map(message => message.toDomainModel());
        messageDAO.count = count;
        return messageDAO;
    }

    async updateMessage(messageArg: Message): Promise<MessageDAO> {
        const message = await this.messageModel.createQueryBuilder("message")
            .leftJoinAndSelect("message.file", "file")
            .where("message.id = :messageId", {messageId: messageArg.id})
            .getOne();

        if (messageArg.name) message!.name = messageArg.name;
        if (messageArg.email) message!.email = messageArg.email;
        if (messageArg.webSite) message!.webSite = messageArg.webSite;
        if (messageArg.title) message!.title = messageArg.title;
        if (messageArg.content) message!.content = messageArg.content;
        if (messageArg.file) {
            const file = await this.fileModel.createQueryBuilder("file")
                .where("file.id = :fileId", {fileId: messageArg.file.id})
                .getOne();
            message!.file = file!;
        }

        const savedMessage = await this.messageModel.save(message!)
        const messageDAO = new MessageDAO();
        messageDAO.message = savedMessage.toDomainModel();
        return messageDAO;
    }

    async deleteMessage(messageId: string): Promise<boolean> {
       try{
           await this.messageModel.createQueryBuilder()
               .delete()
               .where("id = :messageId", {messageId})
               .execute();
           return true
       }catch (err){
           log.error(err, "DeleteMessage");
           return false;
       }
    }
}