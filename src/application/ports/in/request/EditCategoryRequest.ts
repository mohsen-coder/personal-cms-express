export class EditCategoryRequest {
    id: string
    parentId: string | null
    title: string

    constructor(id: string, title: string, parentId: string | null) {
        this.id = id;
        this.title = title;
        this.parentId = parentId;
    }
}