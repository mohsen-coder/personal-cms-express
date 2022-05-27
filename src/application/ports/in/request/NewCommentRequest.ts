export class NewCommentRequest {
    postId: string
    title: string
    name: string
    email: string
    content: string

    constructor(postId: string, title: string, name: string, email: string, content: string) {
        this.postId = postId;
        this.title = title;
        this.name = name;
        this.email = email;
        this.content = content;
    }
}