import {PostResponse} from "./response/PostResponse";
import {Post} from "../../../domain/Post";

export interface CreatePostUseCase {
    createPost(post: Post): Promise<PostResponse>
}