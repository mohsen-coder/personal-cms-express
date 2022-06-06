import {CreatePostPort} from "../../../application/ports/out/CreatePostPort";
import {DeletePostPort} from "../../../application/ports/out/DeletePostPort";
import {GetPostPort} from "../../../application/ports/out/GetPostPort";
import {UpdatePostPort} from "../../../application/ports/out/UpdatePostPort";
import {AccountModel} from "./models/AccountModel";
import {CategoryModel} from "./models/CategoryModel";
import {FileModel} from "./models/FileModel";
import {PostModel} from "./models/PostModel";
import {Post} from "../../../domain/Post";

export class PostPersistence implements CreatePostPort, GetPostPort, UpdatePostPort, DeletePostPort {

    constructor(
        private readonly postModel: typeof PostModel,
        private readonly accountModel: typeof AccountModel,
        private readonly categoryModel: typeof CategoryModel,
        private readonly fileModel: typeof FileModel
    ) {
    }

    private async setPostModelPropsExceptAuthor(post: PostModel, postArg: Post): Promise<PostModel> {
        post.title = postArg.title
        post.content = postArg.content
        post.fullContent = postArg.fullContent
        post.tags = postArg.tags
        if (postArg.publishDate) post.publishDate = postArg.publishDate
        post.status = postArg.status

        if (postArg.thumbnail && postArg.thumbnail.id) {
            const thumbnail = await this.fileModel.findOne({where: {id: postArg.thumbnail.id}})
            if (thumbnail) post.thumbnail = thumbnail;
        }

        if (postArg.categories && postArg.categories.length > 0) {
            post.categories = []
            for (let i = 0; i < postArg.categories.length; i++) {
                const category = await this.categoryModel.findOne({where: {id: postArg.categories[i].id}})
                if (category) post.categories.push(category)
            }
        }

        return post;
    }

    async createPost(postArg: Post): Promise<Post> {
        const postModel = new this.postModel()
        const post = await this.setPostModelPropsExceptAuthor(postModel, postArg);

        const author = await this.accountModel.findOne({where: {id: postArg.author.id}})
        post.author = author!

        const savedPost = await post.save()
        return savedPost.toDomainModel()
    }


    async getPostById(postId: string): Promise<Post | null> {
        const post = await this.postModel.findOne({where: {id: postId}})
        return post ? post.toDomainModel() : null;
    }

    async getPostByTitle(postTitle: string): Promise<Post | null> {
        const post = await this.postModel.findOne({where: {title: postTitle}, relations: {author: true, categories: true}})
        return post ? post.toDomainModel() : null;
    }

    async getPosts(offset: number, limit: number): Promise<Post[]> {
        const posts = await this.postModel.find({skip: offset, take: limit, relations: {author: true, categories: true}})
        return posts.map(post => post.toDomainModel())
    }


    async updatePost(postArg: Post): Promise<Post> {
        const postModel = await this.postModel.findOne({where: {id: postArg.id!}, relations: {author: true, categories: true}})
        const post = await this.setPostModelPropsExceptAuthor(postModel!, postArg)
        const updatedPost = await this.postModel.save(post)
        return updatedPost.toDomainModel()
    }

    async deletePost(postId: string): Promise<boolean> {

        const post = await this.postModel.findOne({where: {id: postId}})

        if (post) {
            await this.postModel.remove(post)
            return true;
        }

        return false;
    }
}