import {PostResponse} from "./response/PostResponse";

export interface GetPostUseCase {
    getPost(request: {
        id?: string,
        postTitle?: string,
        categoryId?: string,
        categoryTitle?: string,
        status?: string,
        like?: boolean,
        view?: boolean,
        pagination?: { offset: number, limit: number }
    }):
        Promise<PostResponse>
}