import {Post} from "../../../domain/Post";
import {PostDAO} from "./dao/PostDAO";

export interface GetPostPort {
    getPostById(postId: string): Promise<PostDAO>;

    getPostByTitle(postTitle: string): Promise<PostDAO>;

    getPostByCategoryIdAndTitle(categoryId: string, postTitle: string): Promise<PostDAO>;

    getPostsByStatus(status: string, offset: number, limit: number): Promise<PostDAO>;

    getPostsByStatusAndCategoryId(status: string, categoryId: string, offset: number, limit: number): Promise<PostDAO>;

    getPostsByCategoryId(categoryId: string, offset: number, limit: number): Promise<PostDAO>;

    getPostsByCategoryTitle(categoryTitle: string, offset: number, limit: number): Promise<PostDAO>;

    getMostLikedPosts(offset: number, limit: number): Promise<PostDAO>;

    getMostViewPosts(offset: number, limit: number): Promise<PostDAO>;
}