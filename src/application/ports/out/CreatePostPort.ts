import {Post} from "../../../domain/Post";
import {PostDAO} from "./dao/PostDAO";

export interface CreatePostPort {
    createPost(post: Post): Promise<PostDAO>
}