import {AccountPersistence} from "./adapters/out/persistence/AccountPersistence";
import {AccountModel} from "./adapters/out/persistence/models/AccountModel";
import {FileModel} from "./adapters/out/persistence/models/FileModel";
import {CreateAccountService} from "./application/services/CreateAccountService";
import {CreateAccountPort} from "./application/ports/out/CreateAccountPort";
import {GetAccountPort} from "./application/ports/out/GetAccountPort";
import {GetAccountService} from "./application/services/GetAccountService";
import {UpdateAccountService} from "./application/services/UpdateAccountService";
import {UpdateAccountPort} from "./application/ports/out/UpdateAccountPort";
import {DeleteAccountService} from "./application/services/DeleteAccountService";
import {DeleteAccountPort} from "./application/ports/out/DeleteAccountPort";
import {CategoryPersistence} from "./adapters/out/persistence/CategoryPersistence";
import {CategoryModel} from "./adapters/out/persistence/models/CategoryModel";
import {CreateCategoryService} from "./application/services/CreateCategoryService";
import {CreateCategoryPort} from "./application/ports/out/CreateCategoryPort";
import {GetCategoryPort} from "./application/ports/out/GetCategoryPort";
import {GetCategoryService} from "./application/services/GetCategoryService";
import {UpdateCategoryService} from "./application/services/UpdateCategoryService";
import {UpdateCategoryPort} from "./application/ports/out/UpdateCategoryPort";
import {DeleteCategoryService} from "./application/services/DeleteCategoryService";
import {DeleteCategoryPort} from "./application/ports/out/DeleteCategoryPort";
import {PostPersistence} from "./adapters/out/persistence/PostPersistence";
import {PostModel} from "./adapters/out/persistence/models/PostModel";
import {CreatePostService} from "./application/services/CreatePostService";
import {CreatePostPort} from "./application/ports/out/CreatePostPort";
import {GetPostService} from "./application/services/GetPostService";
import {GetPostPort} from "./application/ports/out/GetPostPort";
import {UpdatePostService} from "./application/services/UpdatePostService";
import {UpdatePostPort} from "./application/ports/out/UpdatePostPort";
import {DeletePostService} from "./application/services/DeletePostService";
import {DeletePostPort} from "./application/ports/out/DeletePostPort";
import {RegisterMiddleware} from "./adapters/in/express/RegisterMiddleware";
import {RegisterValidationMiddleware} from "./adapters/in/express/RegisterValidationMiddleware";
import {Bcrypt} from "./utils/Bcrypt";
import {LoginService} from "./application/services/LoginService";
import {JWT} from "./utils/JWT";
import {LoginMiddleware} from "./adapters/in/express/LoginMiddleware";
import {GetAccountMiddleware} from "./adapters/in/express/GetAccountMiddleware";
import {UpdateAccountMiddleware} from "./adapters/in/express/UpdateAccountMiddleware";
import {DeleteAccountMiddleware} from "./adapters/in/express/DeleteAccountMiddleware";
import {CreateCategoryMiddleware} from "./adapters/in/express/CreateCategoryMiddleware";
import {GetCategoryMiddleware} from "./adapters/in/express/GetCategoryMiddleware";
import {UpdateCategoryMiddleware} from "./adapters/in/express/UpdateCategoryMiddleware";
import {DeleteCategoryMiddleware} from "./adapters/in/express/DeleteCategoryMiddleware";
import {CreatePostMiddleware} from "./adapters/in/express/CreatePostMiddleware";
import {GetPostMiddleware} from "./adapters/in/express/GetPostMiddleware";
import {UpdatePostMiddleware} from "./adapters/in/express/UpdatePostMiddleware";
import {DeletePostMiddleware} from "./adapters/in/express/DeletePostMiddleware";
import {FilePersistence} from "./adapters/out/persistence/FilePersistence";
import {CreateFileService} from "./application/services/CreateFileService";
import {GetFileService} from "./application/services/GetFileService";
import {DeleteFileService} from "./application/services/DeleteFileService";
import {UploadFileMiddleware} from "./adapters/in/express/UploadFileMiddleware";
import {UploadFileValidationMiddleware} from "./adapters/in/express/UploadFileValidationMiddleware";
import {GetFileMiddleware} from "./adapters/in/express/GetFileMiddleware";
import {DeleteFileMiddleware} from "./adapters/in/express/DeleteFileMiddleware";
import {MessagePersistence} from "./adapters/out/persistence/MessagePersistence";
import {MessageModel} from "./adapters/out/persistence/models/MessageModel";
import {CreateMessageService} from "./application/services/CreateMessageService";
import {GetMessageService} from "./application/services/GetMessageService";
import {UpdateMessageService} from "./application/services/UpdateMessageService";
import {GetMessagePort} from "./application/ports/out/GetMessagePort";
import {UpdateMessagePort} from "./application/ports/out/UpdateMessagePort";
import {DeleteMessageService} from "./application/services/DeleteMessageService";
import {CreateMessageMiddleware} from "./adapters/in/express/CreateMessageMiddleware";
import {GetMessageMiddleware} from "./adapters/in/express/GetMessageMiddleware";
import {UpdateMessageMiddleware} from "./adapters/in/express/UpdateMessageMiddleware";
import {DeleteMessageMiddleware} from "./adapters/in/express/DeleteMessageMiddleware";
import {CommentPersistence} from "./adapters/out/persistence/CommentPersistence";
import {CommentModel} from "./adapters/out/persistence/models/CommentModel";
import {CreateCommentService} from "./application/services/CreateCommentService";
import {GetCommentPort} from "./application/ports/out/GetCommentPort";
import {CreateCommentPort} from "./application/ports/out/CreateCommentPort";
import {GetCommentService} from "./application/services/GetCommentService";
import {UpdateCommentService} from "./application/services/UpdateCommentService";
import {UpdateCommentPort} from "./application/ports/out/UpdateCommentPort";
import {DeleteCommentService} from "./application/services/DeleteCommentService";
import {CreateCommentMiddleware} from "./adapters/in/express/CreateCommentMiddleware";
import {GetCommentMiddleware} from "./adapters/in/express/GetCommentMiddleware";
import {UpdateCommentMiddleware} from "./adapters/in/express/UpdateCommentMiddleware";
import {DeleteCommentMiddleware} from "./adapters/in/express/DeleteCommentMiddleware";
import {CreateCategoryValidationMiddleware} from "./adapters/in/express/CreateCategoryValidationMiddleware";
import {UpdateCategoryValidationMiddleware} from "./adapters/in/express/UpdateCategoryValidationMiddleware";
import {GetCategoryValidationMiddleware} from "./adapters/in/express/GetCategoryValidationMiddleware";
import {DeleteCategoryValidationMiddleware} from "./adapters/in/express/DeleteCategoryValidationMiddleware";
import {CreateCommentValidationMiddleware} from "./adapters/in/express/CreateCommentValidationMiddleware";
import {UpdateCommentValidationMiddleware} from "./adapters/in/express/UpdateCommentValidationMiddleware";
import {GetCommentValidationMiddleware} from "./adapters/in/express/GetCommentValidationMiddleware";
import {DeleteCommentValidationMiddleware} from "./adapters/in/express/DeleteCommentValidationMiddleware";
import {LoginValidationMiddleware} from "./adapters/in/express/LoginValidationMiddleware";
import {GetAccountValidationMiddleware} from "./adapters/in/express/GetAccountValidationMiddleware";
import {UpdateAccountValidationMiddleware} from "./adapters/in/express/UpdateAccountValidationMiddleware";
import {DeleteAccountValidationMiddleware} from "./adapters/in/express/DeleteAccountValidationMiddleware";
import {CreatePostValidationMiddleware} from "./adapters/in/express/CreatePostValidationMiddleware";
import {UpdatePostValidationMiddleware} from "./adapters/in/express/UpdatePostValidationMiddleware";
import {DeletePostValidationMiddleware} from "./adapters/in/express/DeletePostValidationMiddleware";
import {GetPostValidationMiddleware} from "./adapters/in/express/GetPostValidationMiddleware";
import {CreateMessageValidationMiddleware} from "./adapters/in/express/CreateMessageValidationMiddleware";
import {UpdateMessageValidationMiddleware} from "./adapters/in/express/UpdateMessageValidationMiddleware";
import {DeleteMessageValidationMiddleware} from "./adapters/in/express/DeleteMessageValidationMiddleware";
import {GetMessageValidationMiddleware} from "./adapters/in/express/GetMessageValidationMiddleware";
import {TokenValidationMiddleware} from "./adapters/in/express/TokenValidationMiddleware";
import {SettingPersistence} from "./adapters/out/persistence/SettingPersistence";
import {SettingModel} from "./adapters/out/persistence/models/SettingModel";
import {SocialNetworkModel} from "./adapters/out/persistence/models/SocialNetworkModel";
import {UpdateSettingService} from "./application/services/UpdateSettingService";
import {UpdateSettingMiddleware} from "./adapters/in/express/UpdateSettingMiddleware";
import { GetSettingService } from "./application/services/GetSettingService";
import { GetSettingMiddleware } from "./adapters/in/express/GetSettingMiddleware";


export const tokenValidationMiddleware = TokenValidationMiddleware();
export const tokenValidationMiddlewareFinal = TokenValidationMiddleware(true);


const accountPersistence = new AccountPersistence(AccountModel, FileModel);
export const createAccountService = new CreateAccountService(accountPersistence as CreateAccountPort, accountPersistence as GetAccountPort, Bcrypt);
export const getAccountService = new GetAccountService(accountPersistence);
export const updateAccountService = new UpdateAccountService(accountPersistence as UpdateAccountPort, accountPersistence as GetAccountPort);
export const deleteAccountService = new DeleteAccountService(accountPersistence as DeleteAccountPort, accountPersistence as GetAccountPort);
export const loginService = new LoginService(accountPersistence as GetAccountPort, JWT, Bcrypt);
export const getAccountMiddleware = GetAccountMiddleware(getAccountService);
export const getAccountValidationMiddleware = GetAccountValidationMiddleware();
export const updateAccountMiddleware = UpdateAccountMiddleware(updateAccountService);
export const updateAccountValidationMiddleware = UpdateAccountValidationMiddleware();
export const deleteAccountMiddleware = DeleteAccountMiddleware(deleteAccountService);
export const deleteAccountValidationMiddleware = DeleteAccountValidationMiddleware();
export const registerMiddleware = RegisterMiddleware(createAccountService);
export const registerValidationMiddleware = RegisterValidationMiddleware();
export const loginMiddleware = LoginMiddleware(loginService);
export const loginValidationMiddleware = LoginValidationMiddleware()


const categoryPersistence = new CategoryPersistence(CategoryModel);
export const createCategoryService = new CreateCategoryService(categoryPersistence as CreateCategoryPort, categoryPersistence as GetCategoryPort);
export const getCategoryService = new GetCategoryService(categoryPersistence as GetCategoryPort);
export const updateCategoryService = new UpdateCategoryService(categoryPersistence as UpdateCategoryPort, categoryPersistence as GetCategoryPort);
export const deleteCategoryService = new DeleteCategoryService(categoryPersistence as DeleteCategoryPort);
export const createCategoryMiddleware = CreateCategoryMiddleware(createCategoryService);
export const createCategoryValidationMiddleware = CreateCategoryValidationMiddleware()
export const getCategoryMiddleware = GetCategoryMiddleware(getCategoryService);
export const getCategoryValidationMiddleware = GetCategoryValidationMiddleware()
export const updateCategoryMiddleware = UpdateCategoryMiddleware(updateCategoryService);
export const updateCategoryValidationMiddleware = UpdateCategoryValidationMiddleware();
export const deleteCategoryMiddleware = DeleteCategoryMiddleware(deleteCategoryService);
export const deleteCategoryValidationMiddleware = DeleteCategoryValidationMiddleware();


const postPersistence = new PostPersistence(PostModel, AccountModel, CategoryModel, FileModel);
export const createPostService = new CreatePostService(postPersistence as CreatePostPort);
export const getPostService = new GetPostService(postPersistence as GetPostPort);
export const updatePostService = new UpdatePostService(postPersistence as GetPostPort, postPersistence as UpdatePostPort);
export const deletePostService = new DeletePostService(postPersistence as DeletePostPort);
export const createPostMiddleware = CreatePostMiddleware(createPostService);
export const createPostValidationMiddleware = CreatePostValidationMiddleware();
export const getPostMiddleware = GetPostMiddleware(getPostService);
export const getPostValidationMiddleware = GetPostValidationMiddleware();
export const updatePostMiddleware = UpdatePostMiddleware(updatePostService);
export const updatePostValidationMiddleware = UpdatePostValidationMiddleware();
export const deletePostMiddleware = DeletePostMiddleware(deletePostService);
export const deletePostValidationMiddleware = DeletePostValidationMiddleware();


const filePersistence = new FilePersistence(FileModel);
export const createFileService = new CreateFileService(filePersistence);
export const getFileService = new GetFileService(filePersistence);
export const deleteFileService = new DeleteFileService(filePersistence);
export const uploadFileMiddleware = UploadFileMiddleware(createFileService);
export const uploadFileValidationMiddleware = UploadFileValidationMiddleware();
export const getFileMiddleware = GetFileMiddleware(getFileService);
export const deleteFileMiddleware = DeleteFileMiddleware(deleteFileService);


const messagePersistence = new MessagePersistence(MessageModel, FileModel)
export const createMessageService = new CreateMessageService(messagePersistence);
export const getMessageService = new GetMessageService(messagePersistence);
export const updateMessageService = new UpdateMessageService(messagePersistence as GetMessagePort, messagePersistence as UpdateMessagePort);
export const deleteMessageService = new DeleteMessageService(messagePersistence);
export const createMessageMiddleware = CreateMessageMiddleware(createMessageService)
export const createMessageValidationMiddleware = CreateMessageValidationMiddleware();
export const getMessageMiddleware = GetMessageMiddleware(getMessageService);
export const getMessageValidationMiddleware = GetMessageValidationMiddleware();
export const updateMessageMiddleware = UpdateMessageMiddleware(updateMessageService);
export const updateMessageValidationMiddleware = UpdateMessageValidationMiddleware();
export const deleteMessageMiddleware = DeleteMessageMiddleware(deleteMessageService);
export const deleteMessageValidationMiddleware = DeleteMessageValidationMiddleware();


const commentPersistence = new CommentPersistence(CommentModel, PostModel);
export const createCommentService = new CreateCommentService(commentPersistence as GetCommentPort, commentPersistence as CreateCommentPort);
export const getCommentService = new GetCommentService(commentPersistence);
export const updateCommentService = new UpdateCommentService(commentPersistence as GetCommentPort, commentPersistence as UpdateCommentPort);
export const deleteCommentService = new DeleteCommentService(commentPersistence);
export const createCommentMiddleware = CreateCommentMiddleware(createCommentService)
export const createCommentValidationMiddleware = CreateCommentValidationMiddleware();
export const getCommentMiddleware = GetCommentMiddleware(getCommentService);
export const getCommentValidationMiddleware = GetCommentValidationMiddleware();
export const updateCommentMiddleware = UpdateCommentMiddleware(updateCommentService);
export const updateCommentValidationMiddleware = UpdateCommentValidationMiddleware();
export const deleteCommentMiddleware = DeleteCommentMiddleware(deleteCommentService);
export const deleteCommentValidationMiddleware = DeleteCommentValidationMiddleware();


const settingPersistence = new SettingPersistence(SettingModel, SocialNetworkModel, FileModel);
export const updateSettingService = new UpdateSettingService(settingPersistence);
export const getSettingService = new GetSettingService(settingPersistence);
export const updateSettingMiddleware = UpdateSettingMiddleware(updateSettingService);
export const getSettingMiddleware = GetSettingMiddleware(getSettingService);
