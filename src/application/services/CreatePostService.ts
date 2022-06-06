import {CreatePostUseCase} from "../ports/in/CreatePostUseCase";
import {CreatePostPort} from "../ports/out/CreatePostPort";
import {PostResponse} from "../ports/in/response/PostResponse";
import {Post} from "../../domain/Post";
import {ResponseStatus} from "../ports/in/response/ResponseStatus";
import {Messages} from "../../../values/Messages";

export class CreatePostService implements CreatePostUseCase {

    constructor(
        private readonly createPostRepo: CreatePostPort
    ) {
    }

    async createPost(post: Post): Promise<PostResponse> {
        const response = new PostResponse()
        response.post = await this.createPostRepo.createPost(post)
        response.status = ResponseStatus.success;
        response.messages.push(Messages.post.create.Success.fa)
        return response;
    }

}