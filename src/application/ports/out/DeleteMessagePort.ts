export interface DeleteMessagePort {
    deleteMessage(messageId: string): Promise<boolean>
}