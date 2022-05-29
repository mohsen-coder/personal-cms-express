
import { CreateCategoryPort } from "../../../application/ports/out/CreateCategoryPort";
import { CategoryDAO } from "../../../application/ports/out/dao/CategoryDAO";
import { DeleteCategoryPort } from "../../../application/ports/out/DeleteCategoryPort";
import { GetCategoryPort } from "../../../application/ports/out/GetCategoryPort";
import { UpdateCategoryPort } from "../../../application/ports/out/UpdateCategoryPort";
import { CategoryModel } from "./models/CategoryModel";

export class CategoryPersistence implements CreateCategoryPort, GetCategoryPort, UpdateCategoryPort, DeleteCategoryPort {

    private readonly categoryModel: typeof CategoryModel

    constructor(categoryModel: typeof CategoryModel) {
        this.categoryModel = categoryModel;
    }

    async createCategory(categoryArg: CategoryDAO): Promise<CategoryDAO> {

        const category = new this.categoryModel()
        category.title = categoryArg.title

        const savedCategory = await category.save()

        return new CategoryDAO(savedCategory)
    }

    async getCategoryById(categoryId: string): Promise<CategoryDAO | null> {
        const category = await this.categoryModel.findOne({ where: { id: categoryId } })
        return category ? new CategoryDAO(category) : null;
    }

    async getCategoryByTitle(categoryTitle: string): Promise<CategoryDAO | null> {
        const category = await this.categoryModel.findOne({ where: { title: categoryTitle } });
        return category ? new CategoryDAO(category) : null;
    }

    async getCategoriesByParentId(parentId: string): Promise<CategoryDAO[]> {
        const categories = await this.categoryModel.find({ where: { parentId: parentId } })
        return categories.map(category => new CategoryDAO(category))
    }

    async updateCategory(category: CategoryDAO): Promise<CategoryDAO | null> {

        const loadedCategory = await this.categoryModel.findOne({ where: { id: category.id! } })

        if (loadedCategory) {
            loadedCategory.parentId = category.parentId
            loadedCategory.title = category.title

            const savedCategory = await this.categoryModel.save(loadedCategory)

            return new CategoryDAO(savedCategory);
        }

        return null;
    }

    async deleteCategory(categoryId: string): Promise<boolean> {

        const category = await this.categoryModel.findOne({ where: { id: categoryId } })

        if (category) {
            await this.categoryModel.remove(category)
            return true;
        }

        return false;
    }
}