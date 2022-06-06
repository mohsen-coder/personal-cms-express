import {Post} from "../../../domain/Post";

export interface CreatePostPort {
    createPost(post: Post): Promise<Post>
}