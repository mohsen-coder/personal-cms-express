export interface DeleteCommentPort {
    deleteComment(commentId: string): Promise<boolean>
}