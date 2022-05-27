import {Comment} from "./Comment";
import {Account} from "./Account";
import {Category} from "./Category";
import {PostStatus} from "./PostStatus";

export class Post {
    id: string = ""
    thumbnail: string = ""
    title: string = ""
    content: string = ""
    fullContent: string = ""
    categories: Category[] = []
    tags: string[] = []
    comments: Comment[] = []
    author: Account | null = null
    view: number = 0
    like: number = 0
    isLiked: boolean = false
    publishDate: number = 0
    status: PostStatus = PostStatus.none

    constructor(init: object | null) {
        init && Object.assign(this, init)
    }
}
