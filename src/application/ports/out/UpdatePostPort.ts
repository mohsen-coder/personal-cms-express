import { PostDAO } from "./dao/PostDAO";

export interface UpdatePostPort {
    updatePost(post: PostDAO): Promise<PostDAO | null>
}