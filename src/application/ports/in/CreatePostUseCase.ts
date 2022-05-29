import {NewPostRequest} from "./request/NewPostRequest";
import {PostResponse} from "./response/PostResponse";

export interface CreatePostUseCase {
    createPost(request: NewPostRequest): Promise<PostResponse>
}