
import { CreateCategoryPort } from "../../../application/ports/out/CreateCategoryPort";
import { DeleteCategoryPort } from "../../../application/ports/out/DeleteCategoryPort";
import { GetCategoryPort } from "../../../application/ports/out/GetCategoryPort";
import { UpdateCategoryPort } from "../../../application/ports/out/UpdateCategoryPort";
import { CategoryModel } from "./models/CategoryModel";
import {Category} from "../../../domain/Category";

export class CategoryPersistence implements CreateCategoryPort, GetCategoryPort, UpdateCategoryPort, DeleteCategoryPort {

    constructor(
        private readonly categoryModel: typeof CategoryModel
    ) {
    }

    async createCategory(categoryArg: Category): Promise<Category> {

        const category = new this.categoryModel()
        category.title = categoryArg.title

        const savedCategory = await category.save()

        return savedCategory.toDomainModel()
    }

    async getCategoryById(categoryId: string): Promise<Category | null> {
        const category = await this.categoryModel.findOne({ where: { id: categoryId } })
        return category ? category.toDomainModel() : null;
    }

    async getCategoryByTitle(categoryTitle: string): Promise<Category | null> {
        const category = await this.categoryModel.findOne({ where: { title: categoryTitle } });
        return category ? category.toDomainModel() : null;
    }

    async getCategoriesByParentId(parentId: string): Promise<Category[]> {
        const categories = await this.categoryModel.find({ where: { parentId: parentId } })
        return categories.map(category => category.toDomainModel())
    }

    async getCategories(offset: number, limit: number): Promise<Category[]>{
        const categories = await this.categoryModel.find({ skip: offset, take: limit })
        return categories.map(category => category.toDomainModel())
    }

    async updateCategory(category: Category): Promise<Category> {

        const loadedCategory = await this.categoryModel.findOne({ where: { id: category.id! } })

        if(category.parentId) loadedCategory!.parentId = category.parentId
        loadedCategory!.title = category.title

        const savedCategory = await this.categoryModel.save(loadedCategory!)

        return savedCategory.toDomainModel();
    }

    async deleteCategory(categoryId: string): Promise<boolean> {

        const category = await this.categoryModel.findOne({ where: { id: categoryId } })

        if (category) {
            const res = await this.categoryModel.remove(category)
            return true;
        }

        return false;
    }
}