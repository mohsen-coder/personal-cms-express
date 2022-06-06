import {GetPostUseCase} from "../ports/in/GetPostUseCase";
import {GetPostPort} from "../ports/out/GetPostPort";
import {PostResponse} from "../ports/in/response/PostResponse";
import {ResponseStatus} from "../ports/in/response/ResponseStatus";
import {Messages} from "../../../values/Messages";

export class GetPostService implements GetPostUseCase {

    constructor(
        private readonly getPostRepo: GetPostPort
    ) {
    }

    async getPost(
        request: { id?: string, postTitle?: string, categoryId?: string, pagination?: { offset: number, limit: number } }
    ): Promise<PostResponse> {

        const response = new PostResponse()

        if (request.id || request.postTitle) {
            let post;

            if (request.id) post = await this.getPostRepo.getPostById(request.id);
            else post = await this.getPostRepo.getPostByTitle(request.postTitle!)

            if (!post) {
                response.status = ResponseStatus.error
                response.messages.push(Messages.post.get.NotFoundError.fa)
                return response;
            }

            response.post = post
            response.status = ResponseStatus.success
            response.messages.push(Messages.post.get.Success.fa)
            return response;
        }

        if (request.pagination) {
            response.posts = await this.getPostRepo.getPosts(request.pagination.offset, request.pagination.limit)
            response.status = ResponseStatus.success
            response.messages.push(Messages.post.get.Success.fa)
            return response;
        }

        response.status = ResponseStatus.error
        response.messages.push(Messages.post.get.ParameterError.fa)
        return response;
    }


}