export class EditPostRequest {
    thumbnail: object | null = null
    title: string | null = null
    content: string | null = null
    fullContent: string | null = null
    categories: string[] | null = null
    tags: string[] | null = null
    comments: string[] | null = null
    author: object | null = null
    publishDate: number | null = null
    status: string | null = null
}