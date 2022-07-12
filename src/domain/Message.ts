import {File} from "./File";
import { MessageStatus } from "./MessageStatus";

export class Message {
    id: string
    name: string
    email: string
    webSite: string
    title: string
    content: string
    status: MessageStatus
    reply: Message
    parent: Message
    file: File
    createAt: Date
    updateAt: Date
}