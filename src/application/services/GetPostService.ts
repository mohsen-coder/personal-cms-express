import {GetPostUseCase} from "../ports/in/GetPostUseCase";
import {GetPostPort} from "../ports/out/GetPostPort";
import {PostResponse} from "../ports/in/response/PostResponse";
import {ResponseStatus} from "../ports/in/response/ResponseStatus";
import {Messages} from "../../../values/Messages";
import {PostModel} from "../../adapters/in/express/model/PostModel";
import {PostDAO} from "../ports/out/dao/PostDAO";

export class GetPostService implements GetPostUseCase {

    constructor(
        private readonly getPostRepo: GetPostPort
    ) {
    }

    async getPost(
        request: {
            id?: string,
            postTitle?: string,
            categoryId?: string,
            categoryTitle?: string,
            status?: string,
            like?: boolean,
            view?: boolean,
            pagination?: { offset: number, limit: number }
        }
    ): Promise<PostResponse> {

        const response = new PostResponse();
        let postDAO: PostDAO = new PostDAO();

        if (request.id || request.postTitle || request.postTitle && request.categoryId) {
            if (request.id) postDAO = await this.getPostRepo.getPostById(request.id);
            else if (request.postTitle && request.categoryId) postDAO = await this.getPostRepo.getPostByCategoryIdAndTitle(request.categoryId, request.postTitle);
            else postDAO = await this.getPostRepo.getPostByTitle(request.postTitle!);

            if (!postDAO.post) {
                response.status = ResponseStatus.error
                response.messages.push(Messages.post.get.NotFoundError.fa)
                return response;
            }

            response.post = new PostModel();
            response.post.fromDomainModel(postDAO.post);
            response.count = 1;
            response.status = ResponseStatus.success;
            response.messages.push(Messages.post.get.Success.fa);
            return response;
        }

        if (request.pagination) {
            if (request.status && !request.categoryId) postDAO = await this.getPostRepo.getPostsByStatus(request.status, request.pagination.offset, request.pagination.limit);
            if (request.categoryId && !request.status) postDAO = await this.getPostRepo.getPostsByCategoryId(request.categoryId, request.pagination.offset, request.pagination.limit);
            if (request.categoryId && request.status) postDAO = await this.getPostRepo.getPostsByStatusAndCategoryId(request.status, request.categoryId, request.pagination.offset, request.pagination.limit);
            if (request.categoryTitle) postDAO = await this.getPostRepo.getPostsByCategoryTitle(request.categoryTitle, request.pagination.offset, request.pagination.limit);
            if (request.like) postDAO = await this.getPostRepo.getMostLikedPosts(request.pagination.offset, request.pagination.limit);
            if (request.view) postDAO = await this.getPostRepo.getMostViewPosts(request.pagination.offset, request.pagination.limit);
            if (postDAO.posts) {
                response.posts = postDAO.posts.map(post => {
                    const postModel = new PostModel();
                    postModel.fromDomainModel(post)
                    return postModel;
                });
                response.count = postDAO.count;
            } else {
                response.posts = [];
                response.count = 0;
            }
            response.status = ResponseStatus.success;
            response.messages.push(Messages.post.get.Success.fa);
            return response;
        }

        response.status = ResponseStatus.error
        response.messages.push(Messages.post.get.ParameterError.fa)
        return response;
    }


}