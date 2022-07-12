import {db} from "../config/Database";
import {MessageModel} from "../src/adapters/in/express/model/MessageModel";
import {FileModel} from "../src/adapters/in/express/model/FileModel";
import {
    createFileService,
    createMessageService,
    deleteFileService, deleteMessageService,
    getMessageService,
    updateMessageService
} from "../src/Config";
import {v4 as uuidv4} from 'uuid';


type MessageType = {
    id: string,
    name: string,
    email: string,
    webSite?: string,
    title?: string,
    content: string,
    status: string,
    reply?: { id: string } | MessageType,
    parent?: { id: string } | MessageType,
    file?: { id: string },
    createAt: number,
    updateAt: number
}

type ExpectType = {
    msg?: MessageType,
    msgs?: MessageType[],
    status: string,
    messages: string[]
}

const fileId = uuidv4();

async function createFile() {
    const fileModel = new FileModel({
        id: fileId,
        name: 'thumbnail',
        size: '100kb',
        mimeType: 'image/jpeg'
    });

    await createFileService.createFile(fileModel.toDomainModel());
}

async function deleteFile() {
    await deleteFileService.deleteFile(fileId);
}

beforeAll(async () => {
    await db.initialize();
    await createFile();
});

afterAll(async () => {
    await deleteFile();
    await db.destroy();
});


describe('message test', () => {

    let messageId: string;
    let replyId: string;

    test('create', async () => {
        const messageModel = new MessageModel({
            name: 'ali',
            email: 'ali@gmail.com',
            title: 'hey',
            content: 'hello world',
            file: {
                id: fileId
            }
        });
        const response = await createMessageService.createMessage(messageModel.toDomainModel());
        messageId = response.msg.id;
        const expected: ExpectType = {
            msg: {
                id: messageId,
                name: 'ali',
                email: 'ali@gmail.com',
                title: 'hey',
                content: 'hello world',
                file: {
                    id: fileId
                },
                createAt: response.msg.createAt,
                updateAt: response.msg.updateAt,
                status: 'unread'
            },
            status: 'success',
            messages: ['پیغام با موفقیت ارسال شد!']
        };

        expect(response).toEqual(expected);
    });

    test('send reply', async () => {
        const messageModel = new MessageModel({
            name: 'mohsen',
            email: 'mohsen@gmail.com',
            content: 'hello babe',
            status: 'read',
            parent: {
                id: messageId
            }
        });

        const response = await createMessageService.createMessage(messageModel.toDomainModel());
        replyId = response.msg.id;
        const expected: ExpectType = {
            msg: {
                id: replyId,
                name: 'mohsen',
                email: 'mohsen@gmail.com',
                content: 'hello babe',
                status: 'read',
                createAt: response.msg.createAt,
                updateAt: response.msg.updateAt
            },
            status: 'success',
            messages: ['پیغام با موفقیت ارسال شد!']
        };
        expect(response).toEqual(expected);
    });


    test('get message by id', async () => {
        const request = {
            messageId: messageId
        };
        const response = await getMessageService.getMessage(request);
        const expected: ExpectType = {
            msg: {
                id: messageId,
                name: 'ali',
                email: 'ali@gmail.com',
                title: 'hey',
                content: 'hello world',
                file: {
                    id: fileId
                },
                reply: {
                    id: replyId,
                    name: 'mohsen',
                    email: 'mohsen@gmail.com',
                    content: 'hello babe',
                    status: 'read',
                    createAt: response.msg.reply.createAt,
                    updateAt: response.msg.reply.updateAt
                },
                createAt: response.msg.createAt,
                updateAt: response.msg.updateAt,
                status: 'read'
            },
            status: 'success',
            messages: ['پیغام با موفقیت دریافت شد!']
        };
        expect(response).toEqual(expected);
    });

    test('get messages by status', async () => {
        const request = {
            status: 'read',
            offset: 0,
            limit: 10
        };
        const response = await getMessageService.getMessage(request);
        const expected: ExpectType = {
            msgs: [{
                id: messageId,
                name: 'ali',
                email: 'ali@gmail.com',
                title: 'hey',
                content: 'hello world',
                file: {
                    id: fileId
                },
                reply: {
                    id: replyId,
                    name: 'mohsen',
                    email: 'mohsen@gmail.com',
                    content: 'hello babe',
                    status: 'read',
                    createAt: response.msgs[0].reply.createAt,
                    updateAt: response.msgs[0].reply.updateAt
                },
                createAt: response.msgs[0].createAt,
                updateAt: response.msgs[0].updateAt,
                status: 'read'
            }],
            status: 'success',
            messages: ['پیغام با موفقیت دریافت شد!']
        };
        expect(response).toEqual(expected);
    });

    test('get messages by email', async () => {
        const request = {
            email: 'ali@gmail.com'
        };
        const response = await getMessageService.getMessage(request);
        const expected: ExpectType = {
            msgs: [{
                id: messageId,
                name: 'ali',
                email: 'ali@gmail.com',
                title: 'hey',
                content: 'hello world',
                file: {
                    id: fileId
                },
                reply: {
                    id: replyId,
                    name: 'mohsen',
                    email: 'mohsen@gmail.com',
                    content: 'hello babe',
                    status: 'read',
                    createAt: response.msgs[0].reply.createAt,
                    updateAt: response.msgs[0].reply.updateAt
                },
                createAt: response.msgs[0].createAt,
                updateAt: response.msgs[0].updateAt,
                status: 'read'
            }],
            status: 'success',
            messages: ['پیغام با موفقیت دریافت شد!']
        };
        expect(response).toEqual(expected);
    });


    test('update message', async () => {
        const messageModel = new MessageModel({
            id: messageId,
            name: 'haj ali',
            email: 'ali@gmail.com',
            title: 'hey',
            content: 'hello world updated',
            file: {
                id: fileId
            },
            status: 'read'
        });
        const response = await updateMessageService.updateMessage(messageModel.toDomainModel());
        const expected: ExpectType = {
            msg: {
                id: messageId,
                name: 'haj ali',
                email: 'ali@gmail.com',
                title: 'hey',
                content: 'hello world updated',
                file: {
                    id: fileId
                },
                status: 'read',
                createAt: response.msg.createAt,
                updateAt: response.msg.updateAt
            },
            status: 'success',
            messages: ['پیغام با موفقیت ویرایش شد!']
        }

        expect(response).toEqual(expected);
    });

    test('update reply', async () => {
        const messageModel = new MessageModel({
            id: replyId,
            name: 'haj mohsen',
            email: 'mohsen@gmail.com',
            content: 'hello babe updated',
            status: 'read',
            parent: {
                id: messageId
            }
        });
        const response = await updateMessageService.updateMessage(messageModel.toDomainModel());
        const expected: ExpectType = {
            msg: {
                id: replyId,
                name: 'haj mohsen',
                email: 'mohsen@gmail.com',
                content: 'hello babe updated',
                status: 'read',
                createAt: response.msg.createAt,
                updateAt: response.msg.updateAt
            },
            status: 'success',
            messages: ['پیغام با موفقیت ویرایش شد!']
        };
        expect(response).toEqual(expected);
    });


    test('delete message with reply', async () => {
        const response = await deleteMessageService.deleteMessage(messageId);
        const expected: ExpectType = {
            status: 'success',
            messages: ['پیغام با موفقیت حذف شد!']
        }
        expect(response).toEqual(expected);
    });

});