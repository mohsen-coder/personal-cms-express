export class EditCommentRequest {
    id: string
    title: string
    name: string
    email: string
    content: string

    constructor(id: string, title: string, name: string, email: string, content: string) {
        this.id = id;
        this.title = title;
        this.name = name;
        this.email = email;
        this.content = content;
    }
}