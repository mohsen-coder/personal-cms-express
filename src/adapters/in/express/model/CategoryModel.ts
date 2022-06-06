import {Category} from "../../../../domain/Category";

export class CategoryModel {
    id?: string
    parentId?: string
    title!: string

    constructor(init?: any) {
        init && Object.assign(this, init);
    }

    toDomainModel(): Category {
        const category = new Category();
        category.id = this.id;
        category.parentId = this.parentId
        category.title = this.title

        return category;
    }

    fromDomainModel(category: Category) {
        this.id = category.id;
        this.parentId = category.parentId || undefined;
        this.title = category.title;
    }
}