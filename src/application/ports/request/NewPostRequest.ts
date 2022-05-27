export class NewPostRequest {
    thumbnail: {id: string}
    title: string
    content: string
    fullContent: string
    categories: string[]
    tags: string[]
    status: string

    constructor(thumbnail: {id: string}, title: string, content: string, fullContent: string, categories: string[], tags: string[], status: string) {
        this.thumbnail = thumbnail;
        this.title = title;
        this.content = content;
        this.fullContent = fullContent;
        this.categories = categories;
        this.tags = tags;
        this.status = status;
    }
}