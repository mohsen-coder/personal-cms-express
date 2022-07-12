import {db} from "../config/Database";
import {CategoryModel} from "../src/adapters/in/express/model/CategoryModel";
import {createCategoryService, deleteCategoryService, getCategoryService, updateCategoryService} from "../src/Config";


type CategoryType = {
    id: string,
    parent?: {
        id?: string,
        title: string
    },
    title: string
}

type ExpectType = {
    category?: CategoryType,
    categories?: CategoryType[],
    status: string,
    messages: string[]
}

beforeAll(async () => {
    await db.initialize();
});

afterAll(async () => {
    await db.destroy();
});


describe("category test", () => {

    let parentCategoryId: string;
    let childCategoryId: string;

    test('create', async () => {
        const categoryModel = new CategoryModel({
            title: 'hello world',
        })
        const response = await createCategoryService.createCategory(categoryModel.toDomainModel());
        const expected: ExpectType = {
            category: {
                id: response.category!.id!,
                title: 'hello world'
            },
            status: 'success',
            messages: ['دسته بندی با موفقیت ایجاد شد!']
        };
        parentCategoryId = response.category!.id!;
        expect(response).toEqual(expected);
    });

    test('create children category', async () => {
        const categoryModel = new CategoryModel({
            title: 'child category',
            parent: {
                id: parentCategoryId
            }
        });
        const response = await createCategoryService.createCategory(categoryModel.toDomainModel());
        childCategoryId = response.category!.id!;
        const expected: ExpectType = {
            category: {
                id: response.category!.id!,
                title: 'child category',
                parent: {
                    id: parentCategoryId,
                    title: 'hello world'
                }
            },
            status: 'success',
            messages: ['دسته بندی با موفقیت ایجاد شد!']
        };
        expect(response).toEqual(expected);
    })

    test('get by title', async () => {
        const request = {
            title: 'hello world'
        }
        const response = await getCategoryService.getCategory(request);
        const expected: ExpectType = {
            category: {
                id: parentCategoryId,
                title: 'hello world'
            },
            status: 'success',
            messages: ['دسته بندی با موفقیت دریافت شد!']
        };
        expect(response).toEqual(expected);
    });

    test('get child by title', async () => {
        const request = {
            title: 'child category'
        }
        const response = await getCategoryService.getCategory(request);
        const expected: ExpectType = {
            category: {
                id: childCategoryId,
                title: 'child category',
                parent: {
                    id: parentCategoryId,
                    title: 'hello world'
                }
            },
            status: 'success',
            messages: ['دسته بندی با موفقیت دریافت شد!']
        };
        expect(response).toEqual(expected);
    })

    test('get by id', async () => {
        const request = {
            id: parentCategoryId
        }
        const response = await getCategoryService.getCategory(request);
        const expected: ExpectType = {
            category: {
                id: parentCategoryId,
                title: 'hello world'
            },
            status: 'success',
            messages: ['دسته بندی با موفقیت دریافت شد!']
        };
        expect(response).toEqual(expected);
    });

    test('get child by id', async () => {
        const request = {
            id: childCategoryId
        };
        const response = await getCategoryService.getCategory(request);
        const expected: ExpectType = {
            category: {
                id: childCategoryId,
                title: 'child category',
                parent: {
                    id: parentCategoryId,
                    title: 'hello world'
                }
            },
            status: 'success',
            messages: ['دسته بندی با موفقیت دریافت شد!']
        };
        expect(response).toEqual(expected);
    })


    test('get by pagination', async () => {
        const request = {
            pagination: {
                offset: 0,
                limit: 10
            }
        }
        const response = await getCategoryService.getCategory(request);
        const expected: ExpectType = {
            categories: [
                {
                    id: parentCategoryId,
                    title: 'hello world'
                },
                {
                    id: childCategoryId,
                    title: 'child category',
                    parent: {
                        title: 'hello world'
                    }
                }
            ],
            status: 'success',
            messages: ['دسته بندی با موفقیت دریافت شد!']
        }
    });

    test('update', async () => {
        const categoryModel = new CategoryModel({
            id: parentCategoryId,
            title: 'hey parent'
        });
        const response = await updateCategoryService.updateCategory(categoryModel.toDomainModel());
        const expected: ExpectType = {
            category: {
                id: parentCategoryId,
                title: 'hey parent'
            },
            status: 'success',
            messages: ['دسته بندی با موفقیت ویرایش شد!']
        }
        expect(response).toEqual(expected);
    });

    test('update child category', async () => {
        const categoryModel = new CategoryModel({
            id: childCategoryId,
            title: 'hey child',
            parent: {
                id: parentCategoryId
            }
        });
        const response = await updateCategoryService.updateCategory(categoryModel.toDomainModel());
        const expected: ExpectType = {
            category: {
                id: childCategoryId,
                title: 'hey child',
                parent: {
                    id: parentCategoryId,
                    title: 'hey parent'
                }
            },
            status: 'success',
            messages: ['دسته بندی با موفقیت ویرایش شد!']
        }
        expect(response).toEqual(expected);
    });

    test('set child category as a root category', async () => {
        const categoryModel = new CategoryModel({
            id: childCategoryId,
            title: 'hey child'
        });
        const response = await updateCategoryService.updateCategory(categoryModel.toDomainModel());
        const expected: ExpectType = {
            category: {
                id: childCategoryId,
                title: 'hey child'
            },
            status: 'success',
            messages: ['دسته بندی با موفقیت ویرایش شد!']
        };
        expect(response).toEqual(expected);
    })

    test('set child category under parent category', async () => {
        const categoryModel = new CategoryModel({
            id: childCategoryId,
            title: 'hey child',
            parent: {
                id: parentCategoryId
            }
        });
        const response = await updateCategoryService.updateCategory(categoryModel.toDomainModel());
        const expected: ExpectType = {
            category: {
                id: childCategoryId,
                title: 'hey child',
                parent: {
                    id: parentCategoryId,
                    title: 'hey parent'
                }
            },
            status: 'success',
            messages: ['دسته بندی با موفقیت ویرایش شد!']
        };
        expect(response).toEqual(expected);
    });

    test('delete by id', async () => {
        const response = await deleteCategoryService.deleteCategory(parentCategoryId);
        const expected: ExpectType = {
            status: 'success',
            messages: ['دسته بندی با موفقیت حذف شد!']
        };
        expect(response).toEqual(expected);
    });

    test('delete child by id', async () => {
        const response = await deleteCategoryService.deleteCategory(childCategoryId);
        const expected: ExpectType = {
            status: 'success',
            messages: ['دسته بندی با موفقیت حذف شد!']
        };
        expect(response).toEqual(expected);
    })

})