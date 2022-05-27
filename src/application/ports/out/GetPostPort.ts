import {PostDAO} from "./dao/PostDAO";

export interface GetPostPort {
    getPostById(postId: string): PostDAO

    getPostsByViews(postId: string): PostDAO[]

    getPostsByLikes(postId: string): PostDAO[]

    getPosts(offset: number, limit: number): PostDAO[]
}