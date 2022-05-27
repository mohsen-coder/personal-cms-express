import {GetPostRequest} from "../request/GetPostRequest";
import {PostResponse} from "../response/PostResponse";

export interface GetPostUseCase {
    getPost(request: GetPostRequest): PostResponse
}