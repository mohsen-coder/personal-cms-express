import {CreatePostPort} from "../../../application/ports/out/CreatePostPort";
import {DeletePostPort} from "../../../application/ports/out/DeletePostPort";
import {GetPostPort} from "../../../application/ports/out/GetPostPort";
import {UpdatePostPort} from "../../../application/ports/out/UpdatePostPort";
import {AccountModel} from "./models/AccountModel";
import {CategoryModel} from "./models/CategoryModel";
import {FileModel} from "./models/FileModel";
import {PostModel} from "./models/PostModel";
import {Post} from "../../../domain/Post";
import {PostDAO} from "../../../application/ports/out/dao/PostDAO";
import log from "../../../utils/logger";

export class PostPersistence
    implements CreatePostPort, GetPostPort, UpdatePostPort, DeletePostPort {
    constructor(
        private readonly postModel: typeof PostModel,
        private readonly accountModel: typeof AccountModel,
        private readonly categoryModel: typeof CategoryModel,
        private readonly fileModel: typeof FileModel
    ) {
    }

    private async setPostModelPropsExceptAuthor(
        post: PostModel,
        postArg: Post
    ): Promise<PostModel> {
        if (postArg.title) post.title = postArg.title;
        if (postArg.content) post.content = postArg.content;
        if (postArg.fullContent) post.fullContent = postArg.fullContent;
        if (postArg.tags) post.tags = postArg.tags;
        if (postArg.publishDate)
            post.publishDate = postArg.publishDate || new Date();
        if (postArg.status) post.status = postArg.status;

        if (postArg.thumbnail && postArg.thumbnail.id) {
            const thumbnail = await this.fileModel.findOne({
                where: {id: postArg.thumbnail.id},
            });
            if (thumbnail) post.thumbnail = thumbnail;
        }

        if (postArg.categories && postArg.categories.length > 0) {
            post.categories = await this.categoryModel.createQueryBuilder("category")
                .where("category.id IN (:...ids)", {ids: postArg.categories.map(category => category.id)})
                .getMany();
        }

        return post;
    }

    async createPost(postArg: Post): Promise<PostDAO> {
        const postModel = new this.postModel();
        const post = await this.setPostModelPropsExceptAuthor(
            postModel,
            postArg
        );

        const author = await this.accountModel.createQueryBuilder("account")
            .where("account.id = :accountId", {accountId: postArg.author.id})
            .getOne();
        post.author = author!;

        const savedPost = await post.save();
        const postDAO = new PostDAO();
        postDAO.post = savedPost.toDomainModel();
        return postDAO;
    }

    async getPostById(postId: string): Promise<PostDAO> {
        const post = await this.postModel
            .createQueryBuilder("post")
            .leftJoinAndSelect("post.thumbnail", "thumbnail")
            .leftJoinAndSelect("post.categories", "category")
            .leftJoinAndSelect("post.author", "author")
            .leftJoinAndSelect("author.thumbnail", "authorAvatar")
            .where("post.id = :id", {id: postId})
            .select(['post', 'thumbnail.id', 'category.id', 'category.title', 'author.id', 'author.name', 'author.family', 'author.about', 'authorAvatar.id'])
            .getOne();
        const postResponse = new PostDAO();
        if (post) {
            postResponse.post = post.toDomainModel();
            postResponse.count = 1;
        }
        return postResponse;
    }

    async getPostByTitle(postTitle: string): Promise<PostDAO> {
        const post = await this.postModel
            .createQueryBuilder("post")
            .leftJoinAndSelect("post.thumbnail", "thumbnail")
            .leftJoinAndSelect("post.categories", "category")
            .leftJoinAndSelect("post.author", "author")
            .where("post.title = :title", {title: postTitle})
            .getOne();
        const postResponse = new PostDAO();
        if (post) {
            postResponse.post = post.toDomainModel();
            postResponse.count = 1;
        }
        return postResponse;
    }

    async getPostsByStatus(
        status: string,
        offset: number,
        limit: number
    ): Promise<PostDAO> {
        const [posts, count] = await this.postModel
            .createQueryBuilder("post")
            .leftJoinAndSelect("post.thumbnail", "thumbnail")
            .leftJoinAndSelect("post.categories", "category")
            .leftJoinAndSelect("post.author", "author")
            .where("post.status = :status", {status})
            .select([
                "post.id",
                "post.title",
                "post.content",
                "post.tags",
                "post.view",
                "post.like",
                "post.publishDate",
                "post.status",
                "post.createAt",
                "author.id",
                "author.name",
                "author.family",
                "category.id",
                "category.title",
                "thumbnail.id",
                "thumbnail.name",
            ])
            .orderBy("post.createAt", "ASC")
            .skip(offset)
            .take(limit)
            .getManyAndCount();
        const postResponse = new PostDAO();
        postResponse.posts = posts.map((post) => post.toDomainModel());
        postResponse.count = count;
        return postResponse;
    }

    async getPostsByStatusAndCategoryId(status: string, categoryId: string, offset: number, limit: number): Promise<PostDAO> {
        const [posts, count] = await this.postModel
            .createQueryBuilder("post")
            .leftJoinAndSelect("post.thumbnail", "thumbnail")
            .leftJoinAndSelect("post.categories", "category")
            .leftJoinAndSelect("post.author", "author")
            .where("category.id = :categoryId", {categoryId})
            .andWhere("post.status = :status", {status})
            .select([
                "post.id",
                "post.title",
                "post.content",
                "post.tags",
                "post.view",
                "post.like",
                "post.publishDate",
                "post.status",
                "post.createAt",
                "author.id",
                "author.name",
                "author.family",
                "category.id",
                "category.title",
                "thumbnail.id",
                "thumbnail.name",
            ])
            .orderBy("post.createAt", "ASC")
            .skip(offset)
            .take(limit)
            .getManyAndCount();
        const postResponse = new PostDAO();
        postResponse.posts = posts.map((post) => post.toDomainModel());
        postResponse.count = count;
        return postResponse;
    }

    async getPostsByCategoryId(
        categoryId: string,
        offset: number,
        limit: number
    ): Promise<PostDAO> {
        const [posts, count] = await this.postModel
            .createQueryBuilder("post")
            .leftJoinAndSelect("post.thumbnail", "thumbnail")
            .leftJoinAndSelect("post.categories", "category")
            .leftJoinAndSelect("post.author", "author")
            .where("category.id = :categoryId", {categoryId})
            .select([
                "post.id",
                "post.title",
                "post.content",
                "post.tags",
                "post.view",
                "post.like",
                "post.publishDate",
                "post.status",
                "post.createAt",
                "author.id",
                "author.name",
                "author.family",
                "category.id",
                "category.title",
                "thumbnail.id",
                "thumbnail.name",
            ])
            .orderBy("post.createAt", "ASC")
            .skip(offset)
            .take(limit)
            .getManyAndCount();
        const postResponse = new PostDAO();
        postResponse.posts = posts.map((post) => post.toDomainModel());
        postResponse.count = count;
        return postResponse;
    }

    async getPostsByCategoryTitle(
        categoryTitle: string,
        offset: number,
        limit: number
    ): Promise<PostDAO> {
        const [posts, count] = await this.postModel
            .createQueryBuilder("post")
            .leftJoinAndSelect("post.thumbnail", "thumbnail")
            .leftJoinAndSelect("post.categories", "category")
            .leftJoinAndSelect("post.author", "author")
            .where("category.title = :categoryTitle", {categoryTitle})
            .select([
                "post.id",
                "post.title",
                "post.content",
                "post.tags",
                "post.view",
                "post.like",
                "post.publishDate",
                "post.status",
                "post.createAt",
                "author.id",
                "author.name",
                "author.family",
                "category.id",
                "category.title",
                "thumbnail.id",
                "thumbnail.name",
            ])
            .orderBy("post.createAt", "ASC")
            .skip(offset)
            .take(limit)
            .getManyAndCount();
        const postResponse = new PostDAO();
        postResponse.posts = posts.map((post) => post.toDomainModel());
        postResponse.count = count;
        return postResponse;
    }

    async getPostByCategoryIdAndTitle(
        categoryId: string,
        postTitle: string
    ): Promise<PostDAO> {
        const post = await this.postModel
            .createQueryBuilder("post")
            .leftJoinAndSelect("post.thumbnail", "thumbnail")
            .leftJoinAndSelect("post.categories", "category")
            .leftJoinAndSelect("post.author", "author")
            .where("category.id = :categoryId", {categoryId})
            .andWhere("post.title = :postTitle", {postTitle: postTitle})
            .select([
                "post.id",
                "post.title",
                "post.content",
                "post.tags",
                "post.view",
                "post.like",
                "post.publishDate",
                "post.status",
                "post.createAt",
                "author.id",
                "author.name",
                "author.family",
                "category.id",
                "category.title",
                "thumbnail.id",
                "thumbnail.name",
            ])
            .getOne();
        const postResponse = new PostDAO();
        if (post) {
            postResponse.post = post.toDomainModel();
            postResponse.count = 1;
        }
        return postResponse;
    }

    async getMostLikedPosts(offset: number, limit: number): Promise<PostDAO> {
        const [posts, count] = await this.postModel
            .createQueryBuilder("post")
            .leftJoinAndSelect("post.thumbnail", "thumbnail")
            .leftJoinAndSelect("post.categories", "category")
            .leftJoinAndSelect("post.author", "author")
            .where("post.like > 50")
            .select([
                "post.id",
                "post.title",
                "post.content",
                "post.tags",
                "post.view",
                "post.like",
                "post.publishDate",
                "post.status",
                "post.createAt",
                "author.id",
                "author.name",
                "author.family",
                "category.id",
                "category.title",
                "thumbnail.id",
                "thumbnail.name",
            ])
            .orderBy("post.createAt", "ASC")
            .skip(offset)
            .take(limit)
            .getManyAndCount();
        const postResponse = new PostDAO();
        postResponse.posts = posts.map((post) => post.toDomainModel());
        postResponse.count = count;
        return postResponse;
    }

    async getMostViewPosts(offset: number, limit: number): Promise<PostDAO> {
        const [posts, count] = await this.postModel
            .createQueryBuilder("post")
            .leftJoinAndSelect("post.thumbnail", "thumbnail")
            .leftJoinAndSelect("post.categories", "category")
            .leftJoinAndSelect("post.author", "author")
            .where("post.view > 1000")
            .select([
                "post.id",
                "post.title",
                "post.content",
                "post.tags",
                "post.view",
                "post.like",
                "post.publishDate",
                "post.createAt",
                "post.status",
                "author.id",
                "author.name",
                "author.family",
                "category.id",
                "category.title",
                "thumbnail.id",
            ])
            .orderBy("post.createAt", "ASC")
            .skip(offset)
            .take(limit)
            .getManyAndCount();
        const postResponse = new PostDAO();
        postResponse.posts = posts.map((post) => post.toDomainModel());
        postResponse.count = count;
        return postResponse;
    }

    async updatePost(postArg: Post): Promise<PostDAO> {
        const postModel = await this.postModel.createQueryBuilder("post")
            .leftJoinAndSelect("post.author", "author")
            .leftJoinAndSelect("post.categories", "categories")
            .leftJoinAndSelect("post.thumbnail", "thumbnail")
            .where("post.id = :postId", {postId: postArg.id})
            .getOne();
        const post = await this.setPostModelPropsExceptAuthor(
            postModel!,
            postArg
        );
        const updatedPost = await this.postModel.save(post);
        const postDAO = new PostDAO();
        postDAO.post = updatedPost.toDomainModel();
        return postDAO;
    }

    async deletePost(postId: string): Promise<boolean> {
        try {
            await this.postModel.createQueryBuilder()
                .delete()
                .where("id = :postId", {postId})
                .execute();
            return true;
        } catch (err) {
            log.error(err, "DeletePost");
            return false;
        }
    }
}
