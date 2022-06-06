import {GetPostRequest} from "./request/GetPostRequest";
import {PostResponse} from "./response/PostResponse";

export interface GetPostUseCase {
    getPost(request: { id?: string, categoryId?: string, pagination?: { offset: number, limit: number } }):
        Promise<PostResponse>
}