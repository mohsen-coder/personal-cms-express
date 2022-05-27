export class GetCommentRequest {
    id: string | null = null
    postId: string | null = null
    pagination: { offset: number, limit: number } | null = null
}