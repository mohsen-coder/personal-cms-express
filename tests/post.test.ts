import {db} from "../config/Database";
import {AccountModel} from "../src/adapters/in/express/model/AccountModel";
import {
    createAccountService,
    createCategoryService,
    createFileService, createPostService,
    deleteAccountService,
    deleteCategoryService, deleteFileService, deletePostService, getAccountService, getPostService, updatePostService
} from "../src/Config";
import {CategoryModel} from "../src/adapters/in/express/model/CategoryModel";
import {FileModel} from "../src/adapters/in/express/model/FileModel";
import {v4 as UUIdV4} from "uuid";
import {PostModel} from "../src/adapters/in/express/model/PostModel";


let accountId: string;
let categoryId: string;
let fileId: string = UUIdV4();

type PostType = {
    id: string,
    thumbnail?: { id: string },
    title: string,
    content: string,
    fullContent?: string,
    categories?: { id: string, title: string }[],
    tags?: string[],
    author: {
        id: string
    },
    view: number,
    like: number,
    publishDate?: number,
    status: string,
    createAt?: number,
    updateAt?: number
}

type ExpectType = {
    post?: PostType,
    posts?: PostType[],
    status: string,
    messages: string[]
}

async function createAccount() {
    const accountData = {
        name: "Mohsen",
        family: "Coder",
        email: "mohsen@gmail.com",
        username: "mohsen.coder",
        password: "76mnoZxA",
        confirmPassword: "76mnoZxA"
    };

    const accountModel = new AccountModel(accountData);
    await createAccountService.register(accountModel.toDomainModel());
}

async function getAccount() {
    const response = await getAccountService.getAccount({username: "mohsen.coder"});
    accountId = response.account.id;
}

async function deleteAccount() {
    const request = {
        id: accountId
    };
    await deleteAccountService.deleteAccount(request);
}

async function createCategory() {
    const categoryModel = new CategoryModel({
        title: 'hello world',
    })
    const response = await createCategoryService.createCategory(categoryModel.toDomainModel());
    categoryId = response.category.id;
}

async function deleteCategory() {
    await deleteCategoryService.deleteCategory(categoryId);
}

async function uploadFile() {
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
    await createAccount();
    await getAccount();
    await createCategory();
    await uploadFile();
});

afterAll(async () => {
    await deleteFile();
    await deleteCategory();
    await deleteAccount();
    await db.destroy();
});


describe('post tests', () => {

    let postId: string;

    test('create', async () => {
        const postModel = new PostModel({
            thumbnail: {
                id: fileId
            },
            title: 'test post title',
            content: '<h1>test post content</h1>',
            fullContent: '<h2>test post full content</h2>',
            categories: [{id: categoryId}],
            tags: ['tag one', 'tag two'],
            author: {
                id: accountId
            },
            publishDate: new Date().getTime(),
            status: "publish"
        });

        const response = await createPostService.createPost(postModel.toDomainModel());
        postId = response.post.id;
        const expected: ExpectType = {
            post: {
                id: response.post.id,
                thumbnail: {
                    id: fileId
                },
                title: 'test post title',
                content: '<h1>test post content</h1>',
                fullContent: '<h2>test post full content</h2>',
                categories: [{id: categoryId, title: 'hello world'}],
                tags: ['tag one', 'tag two'],
                author: {
                    id: accountId
                },
                publishDate: response.post.publishDate,
                createAt: response.post.createAt,
                updateAt: response.post.updateAt,
                status: "publish",
                like: 0,
                view: 0
            },
            status: 'success',
            messages: ['مطلب با موفقیت ثبت شد!']
        }
        expect(response).toEqual(expected);

    });

    test('get by title', async () => {
        const request = {
            postTitle: 'test post title'
        };

        const response = await getPostService.getPost(request)

        const expected: ExpectType = {
            post: {
                id: response.post.id,
                thumbnail: {
                    id: fileId
                },
                title: 'test post title',
                content: '<h1>test post content</h1>',
                fullContent: '<h2>test post full content</h2>',
                categories: [{id: categoryId, title: 'hello world'}],
                tags: ['tag one', 'tag two'],
                author: {
                    id: accountId
                },
                publishDate: response.post.publishDate,
                createAt: response.post.createAt,
                updateAt: response.post.updateAt,
                status: "publish",
                like: 0,
                view: 0
            },
            status: 'success',
            messages: ['مطلب با موفقیت دریافت شد!']
        }
        expect(response).toEqual(expected);
    });

    test('get by id', async () => {
        const request = {
            id: postId
        };

        const response = await getPostService.getPost(request)

        const expected: ExpectType = {
            post: {
                id: response.post.id,
                thumbnail: {
                    id: fileId
                },
                title: 'test post title',
                content: '<h1>test post content</h1>',
                fullContent: '<h2>test post full content</h2>',
                categories: [{id: categoryId, title: 'hello world'}],
                tags: ['tag one', 'tag two'],
                author: {
                    id: accountId
                },
                publishDate: response.post.publishDate,
                createAt: response.post.createAt,
                updateAt: response.post.updateAt,
                status: "publish",
                like: 0,
                view: 0
            },
            status: 'success',
            messages: ['مطلب با موفقیت دریافت شد!']
        }
        expect(response).toEqual(expected);
    });

    test('get by status', async () => {
        const request = {
            status: 'publish',
            pagination: {
                offset: 0,
                limit: 10
            }
        };

        const response = await getPostService.getPost(request)

        const expected: ExpectType = {
            posts: [{
                id: response.posts[0].id,
                thumbnail: {
                    id: fileId
                },
                title: 'test post title',
                content: '<h1>test post content</h1>',
                categories: [{id: categoryId, title: 'hello world'}],
                tags: ['tag one', 'tag two'],
                author: {
                    id: accountId
                },
                createAt: response.posts[0].createAt,
                publishDate: response.posts[0].publishDate,
                status: "publish",
                like: 0,
                view: 0
            }],
            status: 'success',
            messages: ['مطلب با موفقیت دریافت شد!']
        }
        expect(response).toEqual(expected);
    });

    test('update', async () => {
        const postModel = new PostModel({
            id: postId,
            thumbnail: {
                id: fileId
            },
            title: 'updated post title',
            content: '<h1>test post content updated</h1>',
            fullContent: '<h2>test post full content updated</h2>',
            categories: [{id: categoryId}],
            tags: ['tag one', 'tag two', 'tag three'],
            author: {
                id: accountId
            },
            status: "publish"
        });
        const response = await updatePostService.updatePost(postModel.toDomainModel());
        const expected: ExpectType = {
            post: {
                id: response.post.id,
                thumbnail: {
                    id: fileId
                },
                title: 'updated post title',
                content: '<h1>test post content updated</h1>',
                fullContent: '<h2>test post full content updated</h2>',
                categories: [{id: categoryId, title: 'hello world'}],
                tags: ['tag one', 'tag two', 'tag three'],
                author: {
                    id: accountId
                },
                publishDate: response.post.publishDate,
                createAt: response.post.createAt,
                updateAt: response.post.updateAt,
                status: "publish",
                like: 0,
                view: 0
            },
            status: 'success',
            messages: ['مطلب با موفقیت ویرایش شد!']
        }
        expect(response).toEqual(expected);
    });

    test('delete', async () => {
        const response = await deletePostService.deletePost(postId);
        const expected: ExpectType = {
            status: 'success',
            messages: ['مطلب با موفقیت حذف شد!']
        }
        expect(response).toEqual(expected);
    });

});