import {UpdatePostUseCase} from "../ports/in/UpdatePostUseCase";
import {UpdatePostPort} from "../ports/out/UpdatePostPort";
import {PostResponse} from "../ports/in/response/PostResponse";
import {Post} from "../../domain/Post";
import {ResponseStatus} from "../ports/in/response/ResponseStatus";
import {Messages} from "../../../values/Messages";
import {PostModel} from "../../adapters/in/express/model/PostModel";
import {GetPostPort} from "../ports/out/GetPostPort";

export class UpdatePostService implements UpdatePostUseCase {

    constructor(
        private readonly getPostRepo: GetPostPort,
        private readonly updatePostRepo: UpdatePostPort
    ) {
    }

    async updatePost(post: Post): Promise<PostResponse> {
        const response = new PostResponse()

        let postDAO = await this.getPostRepo.getPostById(post.id!);
        if(!postDAO.post){
            response.status = ResponseStatus.error;
            response.messages.push(Messages.post.get.NotFoundError.fa);
            return response;
        }

        postDAO = await this.updatePostRepo.updatePost(post)
        response.post = new PostModel();
        response.post.fromDomainModel(postDAO.post);
        response.status = ResponseStatus.success;
        response.messages.push(Messages.post.update.Success.fa);
        return response;
    }
}