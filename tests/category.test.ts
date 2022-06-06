import {db} from "../config/Database"
import {Messages} from "../values/Messages";
import {Category} from "../src/domain/Category";
import {CreateCategoryService} from "../src/application/services/CreateCategoryService";
import {CategoryPersistence} from "../src/adapters/out/persistence/CategoryPersistence";
import {CategoryModel} from "../src/adapters/out/persistence/models/CategoryModel";
import {CreateCategoryPort} from "../src/application/ports/out/CreateCategoryPort";
import {GetCategoryPort} from "../src/application/ports/out/GetCategoryPort";
import {GetCategoryService} from "../src/application/services/GetCategoryService";
import {UpdateCategoryService} from "../src/application/services/UpdateCategoryService";
import {UpdateCategoryPort} from "../src/application/ports/out/UpdateCategoryPort";
import {DeleteCategoryService} from "../src/application/services/DeleteCategoryService";
import {DeleteCategoryPort} from "../src/application/ports/out/DeleteCategoryPort";

beforeAll(async () => {
    await db.initialize()
})

afterAll(async () => {
    await db.destroy()
})

describe('account tests', () => {

    test('create', async () => {
        const category = new Category()
        category.title = "test one"

        const categoryPersistence = new CategoryPersistence(CategoryModel);
        const createCategoryService = new CreateCategoryService(categoryPersistence as CreateCategoryPort, categoryPersistence as GetCategoryPort);
        const categoryResponse = await createCategoryService.createCategory(category);

        category.id = categoryResponse.category!.id
        category.parentId = categoryResponse.category!.parentId
        category.createAt = categoryResponse.category!.createAt
        category.updateAt = categoryResponse.category!.updateAt

        const expectedResponse = {
            category: category,
            status: 'success',
            messages: [Messages.category.create.Success.fa]
        }

        expect(categoryResponse).toEqual(expectedResponse)
        // expect(true).toBe(true)
    })

    test('get', async () => {
        const categoryPersistence = new CategoryPersistence(CategoryModel);
        const getCategoryService = new GetCategoryService(categoryPersistence as GetCategoryPort);
        const categoryResponse = await getCategoryService.getCategory({title: "test one"});

        const expectedResponse = {
            category: {
                parentId: categoryResponse.category?.parentId,
                id: categoryResponse.category?.id,
                title: 'test one',
                createAt: categoryResponse.category?.createAt,
                updateAt: categoryResponse.category?.updateAt
            },
            status: 'success',
            messages: [Messages.category.get.Success.fa]
        }
        expect(categoryResponse).toEqual(expectedResponse)
    })

    test('update', async () => {
        const categoryPersistence = new CategoryPersistence(CategoryModel);

        const getCategoryService = new GetCategoryService(categoryPersistence as GetCategoryPort);
        const getCategoryResponse = await getCategoryService.getCategory({title: "test one"});

        const category = getCategoryResponse.category;

        category!.title = "test two"

        const updateCategoryService = new UpdateCategoryService(categoryPersistence as UpdateCategoryPort, categoryPersistence as GetCategoryPort);
        const categoryResponse = await updateCategoryService.updateCategory(category!);

        const expectedResponse = {
            category: {
                id: category?.id,
                parentId: category?.parentId,
                title: "test two",
                createAt: category?.createAt,
                updateAt: categoryResponse.category?.updateAt
            },
            status: 'success',
            messages: [Messages.category.update.Success.fa]
        }

        expect(categoryResponse).toEqual(expectedResponse)
    })

    test('delete', async () => {
        const categoryPersistence = new CategoryPersistence(CategoryModel);

        const getCategoryService = new GetCategoryService(categoryPersistence as GetCategoryPort);
        const categoryResponse = await getCategoryService.getCategory({title: "test two"});

        const deleteCategoryService = new DeleteCategoryService(categoryPersistence as DeleteCategoryPort);
        const responseBase = await deleteCategoryService.deleteCategory(categoryResponse.category!.id!);

        const expectedResponse = {
            status: 'success',
            messages: [Messages.category.delete.Success.fa]
        }

        expect(responseBase).toEqual(expectedResponse)
    })

})