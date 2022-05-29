export class CategoryDAO {
    id?: string
    parentId?: string
    title!: string

    constructor(init: object){
        Object.assign(this, init)
    }
}