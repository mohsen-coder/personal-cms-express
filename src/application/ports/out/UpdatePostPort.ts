import {Post} from "../../../domain/Post";

export interface UpdatePostPort {
    updatePost(post: Post): Promise<Post>
}