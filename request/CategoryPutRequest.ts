export class CategoryPutRequest {
    id: string = ''
    title: string = ''

    constructor(data: object) {
        Object.assign(this, data)
    }
}