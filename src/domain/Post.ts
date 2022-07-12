import {Comment} from "./Comment";
import {Account} from "./Account";
import {Category} from "./Category";
import {PostStatus} from "./PostStatus";
import {File} from "./File";

export class Post {
    id: string
    thumbnail: File
    title: string
    content: string
    fullContent: string
    categories: Category[]
    tags: string[]
    comments: Comment[]
    author: Account
    view: number
    like: number
    publishDate: Date
    status: PostStatus
    createAt: Date
    updateAt: Date
}
