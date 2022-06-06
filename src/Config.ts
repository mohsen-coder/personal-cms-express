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


const accountPersistence = new AccountPersistence(AccountModel, FileModel);
const createAccountService = new CreateAccountService(accountPersistence as CreateAccountPort, accountPersistence as GetAccountPort, Bcrypt);
const getAccountService = new GetAccountService(accountPersistence);
const updateAccountService = new UpdateAccountService(accountPersistence as UpdateAccountPort, accountPersistence as GetAccountPort);
const deleteAccountService = new DeleteAccountService(accountPersistence as DeleteAccountPort, accountPersistence as GetAccountPort);
const loginService = new LoginService(accountPersistence as GetAccountPort, JWT, Bcrypt);
export const getAccountMiddleware = GetAccountMiddleware(getAccountService);
export const updateAccountMiddleware = UpdateAccountMiddleware(updateAccountService);
export const deleteAccountMiddleware = DeleteAccountMiddleware(deleteAccountService);
export const registerMiddleware = RegisterMiddleware(createAccountService);
export const registerValidationMiddleware = RegisterValidationMiddleware();
export const loginMiddleware = LoginMiddleware(loginService);


const categoryPersistence = new CategoryPersistence(CategoryModel);
const createCategoryService = new CreateCategoryService(categoryPersistence as CreateCategoryPort, categoryPersistence as GetCategoryPort);
const getCategoryService = new GetCategoryService(categoryPersistence as GetCategoryPort);
const updateCategoryService = new UpdateCategoryService(categoryPersistence as UpdateCategoryPort, categoryPersistence as GetCategoryPort);
const deleteCategoryService = new DeleteCategoryService(categoryPersistence as DeleteCategoryPort);
export const createCategoryMiddleware = CreateCategoryMiddleware(createCategoryService);
export const getCategoryMiddleware = GetCategoryMiddleware(getCategoryService);
export const updateCategoryMiddleware = UpdateCategoryMiddleware(updateCategoryService);
export const deleteCategoryMiddleware = DeleteCategoryMiddleware(deleteCategoryService);


const postPersistence = new PostPersistence(PostModel, AccountModel, CategoryModel, FileModel);
const createPostService = new CreatePostService(postPersistence as CreatePostPort);
const getPostService = new GetPostService(postPersistence as GetPostPort);
const updatePostService = new UpdatePostService(postPersistence as UpdatePostPort);
const deletePostService = new DeletePostService(postPersistence as DeletePostPort);
export const createPostMiddleware = CreatePostMiddleware(createPostService);
export const getPostMiddleware = GetPostMiddleware(getPostService);
export const updatePostMiddleware = UpdatePostMiddleware(updatePostService);
export const deletePostMiddleware = DeletePostMiddleware(deletePostService);
