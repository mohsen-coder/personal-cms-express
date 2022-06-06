import {UpdatePostUseCase} from "../ports/in/UpdatePostUseCase";
import {UpdatePostPort} from "../ports/out/UpdatePostPort";
import {PostResponse} from "../ports/in/response/PostResponse";
import {Post} from "../../domain/Post";
import {ResponseStatus} from "../ports/in/response/ResponseStatus";
import {Messages} from "../../../values/Messages";

export class UpdatePostService implements UpdatePostUseCase {

    constructor(
        private readonly updatePostRepo: UpdatePostPort
    ) {
    }

    async updatePost(post: Post): Promise<PostResponse> {
        const response = new PostResponse()

        const updatedPost = await this.updatePostRepo.updatePost(post)
        if (!updatedPost) {
            response.status = ResponseStatus.error
            response.messages.push(Messages.post.update.SomethingWentWrongError.fa)
            return response
        }

        response.post = updatedPost
        response.status = ResponseStatus.success
        response.messages.push(Messages.post.update.Success.fa)
        return response
    }
}