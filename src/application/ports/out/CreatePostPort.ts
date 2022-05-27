import {PostDAO} from "./dao/PostDAO";

export interface CreatePostPort {
    createPost(post: PostDAO): PostDAO
}