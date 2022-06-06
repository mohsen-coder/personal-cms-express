import {db} from "../config/Database"
import {CreateAccountService} from "../src/application/services/CreateAccountService";
import {AccountPersistence} from "../src/adapters/out/persistence/AccountPersistence";
import {CreateAccountPort} from "../src/application/ports/out/CreateAccountPort";
import {GetAccountPort} from "../src/application/ports/out/GetAccountPort";
import {AccountModel} from "../src/adapters/out/persistence/models/AccountModel";
import {FileModel} from "../src/adapters/out/persistence/models/FileModel";
import {GetAccountService} from "../src/application/services/GetAccountService";
import {Account} from "../src/domain/Account";
import {AccountRole} from "../src/domain/AccountRole";
import {DeleteAccountService} from "../src/application/services/DeleteAccountService";
import {DeleteAccountPort} from "../src/application/ports/out/DeleteAccountPort";
import {UpdateAccountService} from "../src/application/services/UpdateAccountService";
import {UpdateAccountPort} from "../src/application/ports/out/UpdateAccountPort";
import {Messages} from "../values/Messages";

beforeAll(async () => {
    await db.initialize()
})

afterAll(async () => {
    await db.destroy()
})

describe('account tests', () => {

    test('should create a user', async () => {
        const account = new Account()
        account.name = "mohsen"
        account.family = "coder"
        account.email = "test@gmail.com"
        account.username = "mohsen.coder"
        account.password = "123456789"
        account.role = AccountRole.user

        const accountPersistence = new AccountPersistence(AccountModel, FileModel);
        const createAccountService = new CreateAccountService(accountPersistence as CreateAccountPort, accountPersistence as GetAccountPort);
        const response = await createAccountService.register(account)
        expect(response).toEqual({status: "success", messages: [Messages.account.create.Success.fa]})
    })

    test('get account by username and email', async () => {
        const params = [{email: 'test@gmail.com'}, {username: 'mohsen.coder'}]
        for (let i = 0; i < params.length; i++) {
            const accountPersistence = new AccountPersistence(AccountModel, FileModel);
            const getAccountService = new GetAccountService(accountPersistence);
            const accountResponse = await getAccountService.getAccount(params[i]);

            const expectedObject = {
                account: {
                    id: accountResponse.account?.id,
                    name: "mohsen",
                    family: "coder",
                    email: "test@gmail.com",
                    username: "mohsen.coder",
                    password: null,
                    about: null,
                    thumbnail: null,
                    role: "user",
                    createAt: accountResponse.account?.createAt,
                    updateAt: accountResponse.account?.updateAt
                },
                status: 'success',
                messages: [Messages.account.get.Success.fa]
            }

            expect(accountResponse).toEqual(expectedObject)
        }

    })

    test('get accounts by pagination', async () => {
        const accountPersistence = new AccountPersistence(AccountModel, FileModel);
        const accountService = new GetAccountService(accountPersistence);
        const accountResponse = await accountService.getAccount({pagination: {offset: 0, limit: 10}});

        const expectedObject = {
            accounts: [
                {
                    id: accountResponse.accounts![0].id,
                    name: "mohsen",
                    family: "coder",
                    email: "test@gmail.com",
                    username: "mohsen.coder",
                    password: null,
                    about: null,
                    thumbnail: null,
                    role: "user",
                    createAt: accountResponse.accounts![0].createAt,
                    updateAt: accountResponse.accounts![0].updateAt
                }
            ],
            status: 'success',
            messages: [Messages.account.get.Success.fa]
        }

        expect(accountResponse).toEqual(expectedObject)
    })

    test('update account', async () => {
        const username = "mohsen.coder"
        const accountPersistence = new AccountPersistence(AccountModel, FileModel);
        const getAccountService = new GetAccountService(accountPersistence);
        const {account} = await getAccountService.getAccount({username});

        account!.family = "jjjj"

        const updateAccountService = new UpdateAccountService(accountPersistence as UpdateAccountPort, accountPersistence as GetAccountPort);
        const response = await updateAccountService.updateAccount(account!)

        account!.updateAt = response.account?.updateAt

        const expectedResponse = {
            account: account,
            status: 'success',
            messages: [Messages.account.update.Success.fa]
        }

        expect(response).toEqual(expectedResponse)
    })

    test('delete account by username', async () => {
        const username = "mohsen.coder"
        const accountPersistence = new AccountPersistence(AccountModel, FileModel);
        const deleteAccountService = new DeleteAccountService(accountPersistence as DeleteAccountPort, accountPersistence as GetAccountPort);
        const responseBase = await deleteAccountService.deleteAccount({username});

        const expectedObject = {
            status: "success",
            messages: [Messages.account.delete.Success.fa]
        }

        expect(responseBase).toEqual(expectedObject)
    })

})