import {db} from "../config/Database";
import {Post} from "../src/domain/Post";
import {Account} from "../src/domain/Account";
import {AccountRole} from "../src/domain/AccountRole";
import {AccountPersistence} from "../src/adapters/out/persistence/AccountPersistence";
import {AccountModel} from "../src/adapters/out/persistence/models/AccountModel";
import {FileModel} from "../src/adapters/out/persistence/models/FileModel";
import {CreateAccountService} from "../src/application/services/CreateAccountService";
import {CreateAccountPort} from "../src/application/ports/out/CreateAccountPort";
import {GetAccountPort} from "../src/application/ports/out/GetAccountPort";
import {DeleteAccountService} from "../src/application/services/DeleteAccountService";
import {DeleteAccountPort} from "../src/application/ports/out/DeleteAccountPort";
import {GetAccountService} from "../src/application/services/GetAccountService";
import {PostStatus} from "../src/domain/PostStatus";
import {Category} from "../src/domain/Category";
import {CategoryPersistence} from "../src/adapters/out/persistence/CategoryPersistence";
import {CategoryModel} from "../src/adapters/out/persistence/models/CategoryModel";
import {CreateCategoryService} from "../src/application/services/CreateCategoryService";
import {CreateCategoryPort} from "../src/application/ports/out/CreateCategoryPort";
import {GetCategoryPort} from "../src/application/ports/out/GetCategoryPort";
import {GetCategoryService} from "../src/application/services/GetCategoryService";
import {DeleteCategoryService} from "../src/application/services/DeleteCategoryService";
import {DeleteCategoryPort} from "../src/application/ports/out/DeleteCategoryPort";
import {PostPersistence} from "../src/adapters/out/persistence/PostPersistence";
import {PostModel} from "../src/adapters/out/persistence/models/PostModel";
import {CreatePostService} from "../src/application/services/CreatePostService";
import {CreatePostPort} from "../src/application/ports/out/CreatePostPort";
import {Messages} from "../values/Messages";
import {GetPostService} from "../src/application/services/GetPostService";
import {GetPostPort} from "../src/application/ports/out/GetPostPort";
import {UpdatePostService} from "../src/application/services/UpdatePostService";
import {UpdatePostPort} from "../src/application/ports/out/UpdatePostPort";
import {DeletePostService} from "../src/application/services/DeletePostService";
import {DeletePostPort} from "../src/application/ports/out/DeletePostPort";

async function createAuthor() {
    const account = new Account()
    account.name = "mohsen"
    account.family = "coder"
    account.email = "test@gmail.com"
    account.username = "mohsen.coder"
    account.password = "123456789"
    account.role = AccountRole.user

    const accountPersistence = new AccountPersistence(AccountModel, FileModel);
    const createAccountService = new CreateAccountService(accountPersistence as CreateAccountPort, accountPersistence as GetAccountPort);
    await createAccountService.register(account)
}

async function getAccount(): Promise<Account> {
    const accountPersistence = new AccountPersistence(AccountModel, FileModel);
    const getAccountService = new GetAccountService(accountPersistence);
    const accountResponse = await getAccountService.getAccount({username: "mohsen.coder"});
    return accountResponse.account!
}

async function deleteAuthor() {
    const username = "mohsen.coder"
    const accountPersistence = new AccountPersistence(AccountModel, FileModel);
    const deleteAccountService = new DeleteAccountService(accountPersistence as DeleteAccountPort, accountPersistence as GetAccountPort);
    await deleteAccountService.deleteAccount({username});
}

async function createCategory() {
    const category = new Category()
    category.title = "test one"

    const categoryPersistence = new CategoryPersistence(CategoryModel);
    const createCategoryService = new CreateCategoryService(categoryPersistence as CreateCategoryPort, categoryPersistence as GetCategoryPort);
    await createCategoryService.createCategory(category);
}

async function getCategory(): Promise<Category> {
    const categoryPersistence = new CategoryPersistence(CategoryModel);
    const getCategoryService = new GetCategoryService(categoryPersistence as GetCategoryPort);
    const categoryResponse = await getCategoryService.getCategory({title: "test one"});
    return categoryResponse.category!
}

async function deleteCategory() {
    const categoryPersistence = new CategoryPersistence(CategoryModel);

    const getCategoryService = new GetCategoryService(categoryPersistence as GetCategoryPort);
    const categoryResponse = await getCategoryService.getCategory({title: "test one"});

    const deleteCategoryService = new DeleteCategoryService(categoryPersistence as DeleteCategoryPort);
    await deleteCategoryService.deleteCategory(categoryResponse.category!.id!);
}

beforeAll(async () => {
    await db.initialize()
    await createAuthor()
    await createCategory()
})

afterAll(async () => {
    await db.destroy()
    await deleteAuthor()
    await deleteCategory()
})

describe('post tests', () => {

    test('create', async () => {
        const category = await getCategory()
        const post = new Post();
        post.title = "hello"
        post.content = "world"
        post.fullContent = "hello world"
        post.categories = [category]
        post.author = await getAccount()
        post.tags = ['hello', 'world']
        post.status = PostStatus.publish

        const postPersistence = new PostPersistence(PostModel, AccountModel, CategoryModel, FileModel);
        const createPostService = new CreatePostService(postPersistence as CreatePostPort);
        const postResponse = await createPostService.createPost(post);

        post.id = postResponse.post?.id
        post.thumbnail = postResponse.post?.thumbnail
        post.comments = postResponse.post?.comments
        post.publishDate = postResponse.post?.publishDate
        post.like = postResponse.post?.like
        post.view = postResponse.post?.view
        post.createAt = postResponse.post?.createAt
        post.updateAt = postResponse.post?.updateAt

        const expectedResponse = {
            post: post,
            status: 'success',
            messages: [Messages.post.create.Success.fa]
        }

        expect(postResponse).toEqual(expectedResponse)

    })

    test('get single', async () => {
        const category = await getCategory()

        const postPersistence = new PostPersistence(PostModel, AccountModel, CategoryModel, FileModel);
        const getPostService = new GetPostService(postPersistence as GetPostPort);
        const postResponse = await getPostService.getPost({postTitle: "hello"});

        const expectedResponse = {
            post: {
                id: postResponse.post!.id,
                title: "hello",
                thumbnail: null,
                content: "world",
                fullContent: "hello world",
                categories: [category],
                author: await getAccount(),
                tags: ['hello', 'world'],
                status: PostStatus.publish,
                like: 0,
                view: 0,
                publishDate: null,
                createAt: postResponse.post!.createAt,
                updateAt: postResponse.post!.updateAt,
            },
            status: 'success',
            messages: [Messages.post.get.Success.fa]
        }

        expect(postResponse).toEqual(expectedResponse)
    })

    test('get by pagination', async () => {
        const category = await getCategory()

        const postPersistence = new PostPersistence(PostModel, AccountModel, CategoryModel, FileModel);
        const getPostService = new GetPostService(postPersistence as GetPostPort);
        const postResponse = await getPostService.getPost({pagination: {offset: 0, limit: 10}});

        const expectedResponse = {
            posts: [{
                id: postResponse.posts![0].id,
                title: "hello",
                thumbnail: null,
                content: "world",
                fullContent: "hello world",
                categories: [category],
                author: await getAccount(),
                tags: ['hello', 'world'],
                status: PostStatus.publish,
                like: 0,
                view: 0,
                publishDate: null,
                createAt: postResponse.posts![0].createAt,
                updateAt: postResponse.posts![0].updateAt,
            }],
            status: 'success',
            messages: [Messages.post.get.Success.fa]
        }

        expect(postResponse).toEqual(expectedResponse)
    })

    test('update', async () => {
        const postPersistence = new PostPersistence(PostModel, AccountModel, CategoryModel, FileModel);

        const getPostService = new GetPostService(postPersistence as GetPostPort);
        const getPostResponse = await getPostService.getPost({postTitle: "hello"});

        const post = getPostResponse.post!
        post.title = "hi babe"

        const updatePostService = new UpdatePostService(postPersistence as UpdatePostPort);
        const postResponse = await updatePostService.updatePost(post);

        post.updateAt = postResponse.post!.updateAt;

        const expectedResponse = {
            post: post,
            status: 'success',
            messages: [Messages.post.update.Success.fa]
        }

        expect(postResponse).toEqual(expectedResponse)
    })

    test('delete', async () => {
        const postPersistence = new PostPersistence(PostModel, AccountModel, CategoryModel, FileModel);

        const getPostService = new GetPostService(postPersistence as GetPostPort);
        const getPostResponse = await getPostService.getPost({postTitle: "hi babe"});

        const post = getPostResponse.post!

        const deletePostService = new DeletePostService(postPersistence as DeletePostPort);
        const responseBase = await deletePostService.deletePost(post.id!);

        const expectedResponse = {
            status: 'success',
            messages: [Messages.post.delete.Success.fa]
        }

        expect(responseBase).toEqual(expectedResponse)
    })

})