import {db} from "../config/Database";
import {FileModel} from "../src/adapters/in/express/model/FileModel";
import {createFileService, deleteFileService, getFileService} from "../src/Config";
import { v4 as UUIdV4 } from 'uuid';

type FileType = {
    id: string,
    name: string,
    size: string,
    mimeType: string,
    createAt: number
};

type ExpectType = {
    file?: FileType,
    files?: FileType[],
    status: string,
    messages: string[]
}

beforeAll(async () => {
    await db.initialize();
})

afterAll(async () => {
    await db.destroy();
})

describe('file tests', () => {

    let fileId: string = UUIdV4();

    test('create', async () => {
        const fileModel = new FileModel({
            id: fileId,
            name: 'thumbnail',
            size: '100kb',
            mimeType: 'image/jpeg'
        });

        const response = await createFileService.createFile(fileModel.toDomainModel());
        const expected: ExpectType = {
            file: {
                id: fileId,
                name: 'thumbnail',
                size: '100kb',
                mimeType: 'image/jpeg',
                createAt: response.file!.createAt!
            },
            status: 'success',
            messages: ['فایل با موفقیت ارسال شد!']
        };
        expect(response).toEqual(expected);
    });

    test('get by id', async () => {
        const request = {
            id: fileId
        }
        const response = await getFileService.getFile(request);
        const expected: ExpectType = {
            file: {
                id: fileId,
                name: 'thumbnail',
                size: '100kb',
                mimeType: 'image/jpeg',
                createAt: response.file!.createAt!
            },
            status: 'success',
            messages: ['فایل با موفقیت دریافت شد!']
        }
        expect(response).toEqual(expected);
    });

    test('delete', async () => {
        const response = await deleteFileService.deleteFile(fileId);
        const expected: ExpectType = {
            status: 'success',
            messages: ['فایل با موفقیت حذف شد!']
        }
        expect(response).toEqual(expected);
    });

})