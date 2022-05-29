import {PostDAO} from "./dao/PostDAO";

export interface GetPostPort {
    getPostById(postId: string): Promise<PostDAO | null>

    getPosts(offset: number, limit: number): Promise<PostDAO[]>
}