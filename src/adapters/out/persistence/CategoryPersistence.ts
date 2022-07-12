import {CreateCategoryPort} from "../../../application/ports/out/CreateCategoryPort";
import {DeleteCategoryPort} from "../../../application/ports/out/DeleteCategoryPort";
import {GetCategoryPort} from "../../../application/ports/out/GetCategoryPort";
import {UpdateCategoryPort} from "../../../application/ports/out/UpdateCategoryPort";
import {CategoryModel} from "./models/CategoryModel";
import {Category} from "../../../domain/Category";
import {CategoryDAO} from "../../../application/ports/out/dao/CategoryDAO";
import log from "../../../utils/logger";

export class CategoryPersistence implements CreateCategoryPort, GetCategoryPort, UpdateCategoryPort, DeleteCategoryPort {

    constructor(
        private readonly categoryModel: typeof CategoryModel
    ) {
    }

    async createCategory(categoryArg: Category): Promise<CategoryDAO> {
        const category = new this.categoryModel()
        category.title = categoryArg.title
        if (categoryArg.parent) {
            const parentCategory = await this.categoryModel.findOne({where: {id: categoryArg.parent.id}})
            category.parent = parentCategory!;
        }
        const savedCategory = await category.save()
        const categoryDAO = new CategoryDAO();
        categoryDAO.category = savedCategory.toDomainModel();
        return categoryDAO;
    }

    async getCategoryById(categoryId: string): Promise<CategoryDAO> {
        const category = await this.categoryModel.createQueryBuilder("category")
            .leftJoinAndSelect("category.parent", "parent")
            .where("category.id = :categoryId", {categoryId})
            .getOne();
        const categoryDAO = new CategoryDAO();
        if (category) categoryDAO.category = category.toDomainModel();
        return categoryDAO;
    }

    async getCategoryByTitle(categoryTitle: string): Promise<CategoryDAO> {
        const category = await this.categoryModel.createQueryBuilder("category")
            .leftJoinAndSelect("category.parent", "parent")
            .where("category.title = :categoryTitle", {categoryTitle})
            .getOne();
        const categoryDAO = new CategoryDAO();
        if (category) categoryDAO.category = category.toDomainModel();
        return categoryDAO;
    }

    async getCategoriesByParentId(parentId: string, offset: number, limit: number): Promise<CategoryDAO> {
        const [categories, count] = await this.categoryModel.createQueryBuilder("category")
            .leftJoinAndSelect("category.parent", "parent")
            .where("parent.id = :parentId", {parentId})
            .orderBy("category.createAt", "DESC")
            .skip(offset)
            .take(limit)
            .getManyAndCount();
        const categoryDAO = new CategoryDAO();
        categoryDAO.categories = categories.map(category => category.toDomainModel());
        categoryDAO.count = count;
        return categoryDAO;
    }

    async getCategories(offset: number, limit: number): Promise<CategoryDAO> {
        const [categories, count] = await this.categoryModel.createQueryBuilder("category")
            .leftJoinAndSelect("category.parent", "parent")
            .orderBy("category.createAt", "DESC")
            .skip(offset)
            .take(limit)
            .getManyAndCount();
        const categoryDAO = new CategoryDAO();
        categoryDAO.categories = categories.map(category => category.toDomainModel());
        categoryDAO.count = count;
        return categoryDAO;
    }

    async updateCategory(category: Category): Promise<CategoryDAO> {
        const loadedCategory = await this.categoryModel.createQueryBuilder("category")
            .leftJoinAndSelect("category.parent", "parent")
            .where("category.id = :categoryId", {categoryId: category.id})
            .getOne();
        if (category.parent && category.parent.id !== category.id) {
            const parentCategory = await this.categoryModel.createQueryBuilder("category")
                .where("category.id = :categoryId", {categoryId: category.parent.id})
                .getOne();
            loadedCategory!.parent = parentCategory!;
        } else {
            loadedCategory!.parent = null;
        }

        if (category.title) loadedCategory!.title = category.title;
        const savedCategory = await this.categoryModel.save(loadedCategory!)
        const categoryDAO = new CategoryDAO();
        categoryDAO.category = savedCategory.toDomainModel();
        return categoryDAO;
    }

    async deleteCategory(categoryId: string): Promise<boolean> {
       try{
           await this.categoryModel.createQueryBuilder()
               .delete()
               .where("id = :categoryId", {categoryId})
               .execute();
           return true;
       }catch (err){
           log.error(err, "DeleteCategory")
           return false;
       }
    }
}