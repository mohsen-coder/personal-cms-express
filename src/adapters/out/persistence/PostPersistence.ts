import { CreatePostPort } from "../../../application/ports/out/CreatePostPort";
import { PostDAO } from "../../../application/ports/out/dao/PostDAO";
import { DeletePostPort } from "../../../application/ports/out/DeletePostPort";
import { GetPostPort } from "../../../application/ports/out/GetPostPort";
import { UpdatePostPort } from "../../../application/ports/out/UpdatePostPort";
import { AccountModel } from "./models/AccountModel";
import { CategoryModel } from "./models/CategoryModel";
import { FileModel } from "./models/FileModel";
import { PostModel } from "./models/PostModel";

export class PostPersistence implements CreatePostPort, GetPostPort, UpdatePostPort, DeletePostPort {

    private readonly postModel: typeof PostModel
    private readonly accountModel: typeof AccountModel
    private readonly categoryModel: typeof CategoryModel
    private readonly fileModel: typeof FileModel

    constructor(postModel: typeof PostModel, accountModel: typeof AccountModel, categoryModel: typeof CategoryModel, fileModel: typeof FileModel) {
        this.postModel = postModel
        this.accountModel = accountModel
        this.categoryModel = categoryModel
        this.fileModel = fileModel
    }


    async createPost(postArg: PostDAO): Promise<PostDAO> {

        const post = new this.postModel()
        post.title = postArg.title
        post.content = postArg.content
        post.fullContent = postArg.fullContent
        post.tags = postArg.tags
        post.publishDate = postArg.publishDate
        post.status = postArg.status

        if (postArg.thumbnail && postArg.thumbnail.id) {
            const thumbnail = await this.fileModel.findOne({ where: { id: postArg.thumbnail.id } })
            if (thumbnail) post.thumbnail = thumbnail;
        }

        if (postArg.categories && postArg.categories.length > 0) {
            post.categories = []
            for (let i = 0; i < postArg.categories.length; i++) {
                const category = await this.categoryModel.findOne({ where: { id: postArg.categories[i].id } })
                if (category) post.categories.push(category)
            }
        }

        const author = await this.accountModel.findOne({ where: { id: postArg.author.id } })
        post.author = author!


        const savedPost = await post.save()

        return new PostDAO(savedPost)
    }


    async getPostById(postId: string): Promise<PostDAO | null> {
        const post = await this.postModel.findOne({ where: { id: postId } })
        return post ? new PostDAO(post) : null;
    }

    async getPosts(offset: number, limit: number): Promise<PostDAO[]> {
        const posts = await this.postModel.find({ skip: offset, take: limit })
        return posts.map(post => new PostDAO(post))
    }


    async updatePost(postArg: PostDAO): Promise<PostDAO | null> {

        const post = await this.postModel.findOne({ where: { id: postArg.id! } })

        if (post) {
            post.title = postArg.title
            post.content = postArg.content
            post.fullContent = postArg.fullContent
            post.tags = postArg.tags
            post.publishDate = postArg.publishDate
            post.status = postArg.status

            if (postArg.thumbnail && postArg.thumbnail.id) {
                const thumbnail = await this.fileModel.findOne({ where: { id: postArg.thumbnail.id } })
                if (thumbnail) post.thumbnail = thumbnail;
            }

            if (postArg.categories && postArg.categories.length > 0) {
                post.categories = []
                for (let i = 0; i < postArg.categories.length; i++) {
                    const category = await this.categoryModel.findOne({ where: { id: postArg.categories[i].id } })
                    if (category) post.categories.push(category)
                }
            }

            const updatedPost = await this.postModel.save(post)

            return new PostDAO(updatedPost)
        }

        return null;
    }

    async deletePost(postId: string): Promise<boolean> {

        const post = await this.postModel.findOne({where: {id: postId}})
        
        if(post) {
            await this.postModel.remove(post)
            return true;
        }
        
        return false;
    }
}