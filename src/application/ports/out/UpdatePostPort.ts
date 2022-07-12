import {Post} from "../../../domain/Post";
import {PostDAO} from "./dao/PostDAO";

export interface UpdatePostPort {
    updatePost(post: Post): Promise<PostDAO>
}