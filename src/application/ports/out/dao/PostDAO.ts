import {Category} from "../../../../domain/Category";
import {Comment} from "../../../../domain/Comment";
import {Account} from "../../../../domain/Account";

export class PostDAO {
    id: string | null = null
    thumbnail: { id: string } | null = null
    title: string | null = null
    content: string | null = null
    fullContent: string | null = null
    categories: { id: string }[] | null = null
    tags: string[] | null = null
    comments: { id: string }[] | null = null
    author: { id: string } | null = null
    view: number = 0
    like: number = 0
    isLiked: boolean = false
    publishDate: number = 0
    status: string | null = null
}