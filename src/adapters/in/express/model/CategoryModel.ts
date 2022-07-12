import {Category} from "../../../../domain/Category";

export class CategoryModel {
    id: string
    parent: CategoryModel
    title: string

    constructor(init?: any) {
        init && Object.assign(this, init);
        if (init && init.parent) this.parent = new CategoryModel(init.parent);
    }

    toDomainModel(): Category {
        const category = new Category();
        if (this.id) category.id = this.id;
        if (this.parent) category.parent = this.parent.toDomainModel();
        if (this.title) category.title = this.title;
        return category;
    }

    fromDomainModel(category: Category) {
        if (category.id) this.id = category.id;
        if (category.parent) {
            this.parent = new CategoryModel();
            this.parent.fromDomainModel(category.parent)
        }
        if (category.title) this.title = category.title;
    }
}