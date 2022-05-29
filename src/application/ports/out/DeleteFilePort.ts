export interface DeleteFilePort {
    deleteFile(fileId: string): Promise<boolean>
}