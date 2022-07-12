import {Post} from "../../../../domain/Post";

import {PostStatus} from "../../../../domain/PostStatus";
import {CategoryModel} from "./CategoryModel";
import {AccountModel} from "./AccountModel";
import {FileModel} from "./FileModel";
import {CommentModel} from "./CommentModel";
import {isInteger} from "lodash";

export class PostModel {
    id: string
    thumbnail: FileModel
    title: string
    content: string
    fullContent: string
    categories: CategoryModel[]
    tags: string[]
    comments: CommentModel[]
    author: AccountModel
    view: number
    like: number
    publishDate: number
    status: string
    createAt: number
    updateAt: number

    constructor(init?: any) {
        init && Object.assign(this, init)
        if (init && init.thumbnail)
            this.thumbnail = new FileModel(init.thumbnail);
        if (init && init.categories)
            this.categories = init.categories.map((categoryArg: object) => new CategoryModel(categoryArg));
        if (init && init.author)
            this.author = new AccountModel(init.author);
        else this.author = new AccountModel();
    }

    toDomainModel(): Post {
        const post = new Post();
        post.id = this.id;
        if (this.title) post.title = this.title;
        if (this.content) post.content = this.content;
        if (this.fullContent) post.fullContent = this.fullContent;
        if (this.author) post.author = this.author.toDomainModel();
        if (this.thumbnail) post.thumbnail = this.thumbnail.toDomainModel();

        if (this.categories)
            post.categories = this.categories.map(category => category.toDomainModel());


        if (this.tags) post.tags = this.tags;

        if (this.publishDate)
            post.publishDate = new Date(this.publishDate);

        switch (this.status) {
            case "publish":
                post.status = PostStatus.publish;
                break;
            case "suspend":
                post.status = PostStatus.suspend;
                break;
            default:
                post.status = PostStatus.none;
        }

        return post;
    }

    fromDomainModel(post: Post) {
        this.id = post.id
        if (post.thumbnail) {
            this.thumbnail = new FileModel()
            this.thumbnail.fromDomainModel(post.thumbnail)
        }
        if(post.title) this.title = post.title;
        if(post.content) this.content = post.content;
        if(post.fullContent) this.fullContent = post.fullContent;
        if (post.categories)
            this.categories = post.categories.map(categoryArg => {
                const categoryModel = new CategoryModel();
                categoryModel.fromDomainModel(categoryArg);
                return categoryModel;
            })
        if(post.tags) this.tags = post.tags;
        if(post.comments) this.comments = post.comments.map(comment => new CommentModel(comment));
        if (post.author){
            this.author = new AccountModel();
            this.author.fromDomainModel(post.author);
        }
        if(isInteger(post.view)) this.view = post.view;
        if(isInteger(post.like)) this.like = post.like;
        if (post.publishDate) this.publishDate = post.publishDate.getTime();
        if(post.status) this.status = post.status;
        if (post.createAt) this.createAt = post.createAt.getTime();
        if (post.updateAt) this.updateAt = post.updateAt.getTime();
    }
}