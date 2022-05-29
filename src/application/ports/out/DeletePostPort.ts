export interface DeletePostPort {
    deletePost(postId: string): Promise<boolean>
}