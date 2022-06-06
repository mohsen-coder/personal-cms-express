import {Post} from "../../../domain/Post";

export interface GetPostPort {
    getPostById(postId: string): Promise<Post | null>

    getPostByTitle(postTitle: string): Promise<Post | null>

    getPosts(offset: number, limit: number): Promise<Post[]>
}