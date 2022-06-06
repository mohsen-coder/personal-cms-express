import {PostResponse} from "./response/PostResponse";
import {Post} from "../../../domain/Post";

export interface UpdatePostUseCase {
    updatePost(post: Post): Promise<PostResponse>
}