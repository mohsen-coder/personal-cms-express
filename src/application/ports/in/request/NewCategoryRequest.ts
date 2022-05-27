export class NewCategoryRequest {
    title: string
    parentId: string | null

    constructor(title: string, parentId: string | null) {
        this.title = title;
        this.parentId = parentId;
    }
}