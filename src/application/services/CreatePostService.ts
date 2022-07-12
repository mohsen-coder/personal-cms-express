import {CreatePostUseCase} from "../ports/in/CreatePostUseCase";
import {CreatePostPort} from "../ports/out/CreatePostPort";
import {PostResponse} from "../ports/in/response/PostResponse";
import {Post} from "../../domain/Post";
import {ResponseStatus} from "../ports/in/response/ResponseStatus";
import {Messages} from "../../../values/Messages";
import {PostModel} from "../../adapters/in/express/model/PostModel";

export class CreatePostService implements CreatePostUseCase {

    constructor(
        private readonly createPostRepo: CreatePostPort
    ) {
    }

    async createPost(post: Post): Promise<PostResponse> {
        const response = new PostResponse();
        const postDAO = await this.createPostRepo.createPost(post);
        response.post = new PostModel();
        response.post.fromDomainModel(postDAO.post);
        response.status = ResponseStatus.success;
        response.messages.push(Messages.post.create.Success.fa);
        return response;
    }

}