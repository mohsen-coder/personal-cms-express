import {EditPostRequest} from "./request/EditPostRequest";
import {PostResponse} from "./response/PostResponse";

export interface UpdatePostUseCase {
    updatePost(request: EditPostRequest): PostResponse
}