export class Category {
    id: string = ""
    parentId: string = ""
    title: string = ""

    constructor(init: object | null) {
        init && Object.assign(this, init)
    }
}