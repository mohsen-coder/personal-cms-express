export class Category {
    id: string
    parent: Category
    children: Category[]
    title: string
    createAt: Date
    updateAt: Date
}