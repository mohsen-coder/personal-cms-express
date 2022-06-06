import {ResponseBase} from "./response/ResponseBase";

export interface DeletePostUseCase {
    deletePost(postId: string): Promise<ResponseBase>
}