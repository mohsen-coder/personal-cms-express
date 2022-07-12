import {db} from "../config/Database"
import {createAccountService, getAccountService, updateAccountService, deleteAccountService} from '../src/Config';
import {AccountModel} from '../src/adapters/in/express/model/AccountModel';

type AccountType = {
    id: string,
    name: string,
    family: string,
    email: string,
    username: string,
    role: string,
    about?: string,
    createAt?: number,
    updateAt?: number
}

type ExpectType = {
    account?: AccountType,
    accounts?: AccountType[],
    status: string,
    messages: string[]
}

beforeAll(async () => {
    await db.initialize();
})

afterAll(async () => {
    await db.destroy();
})

let accountId: string | undefined;

describe('account tests', () => {

    test('create', async () => {
        const accountData = {
            name: "Mohsen",
            family: "Coder",
            email: "mohsen@gmail.com",
            username: "mohsen.coder",
            password: "76mnoZxA",
            confirmPassword: "76mnoZxA"
        };

        const accountModel = new AccountModel(accountData);
        const response = await createAccountService.register(accountModel.toDomainModel());
        const expected: ExpectType = {
            status: "success",
            messages: ['عضویت با موفقیت انجام شد!']
        };
        expect(response).toEqual(expected);
    })

    test('get get by username', async () => {
        const request = {
            username: 'mohsen.coder'
        }

        const response = await getAccountService.getAccount(request);
        accountId = response.account?.id;
        const expected: ExpectType = {
            account: {
                id: response.account!.id!,
                name: "Mohsen",
                family: "Coder",
                email: "mohsen@gmail.com",
                username: "mohsen.coder",
                role: response.account!.role,
                about: response.account!.about,
                createAt: response.account?.createAt,
                updateAt: response.account?.updateAt
            },
            status: 'success',
            messages: ['با موفقیت دریافت شد!']
        };
        if (response.account?.about) expected.account!.about = response.account.about;
        expect(response).toEqual(expected);
    })

    test('get by email', async () => {
        const request = {
            email: 'mohsen@gmail.com'
        }

        const response = await getAccountService.getAccount(request)
        const expected: ExpectType = {
            account: {
                id: response.account!.id!,
                name: "Mohsen",
                family: "Coder",
                email: "mohsen@gmail.com",
                username: "mohsen.coder",
                role: response.account!.role,
                about: response.account!.about,
                createAt: response.account?.createAt,
                updateAt: response.account?.updateAt
            },
            status: 'success',
            messages: ['با موفقیت دریافت شد!']
        };
        if (response.account?.about) expected.account!.about = response.account.about;
        expect(response).toEqual(expected);
    })

    test('get by id', async () => {
        const request = {
            id: accountId
        }

        const response = await getAccountService.getAccount(request)
        const expected = {
            account: {
                id: response.account?.id,
                name: "Mohsen",
                family: "Coder",
                email: "mohsen@gmail.com",
                username: "mohsen.coder",
                about: response.account?.about,
                role: response.account?.role,
                createAt: response.account?.createAt,
                updateAt: response.account?.updateAt
            },
            status: 'success',
            messages: ['با موفقیت دریافت شد!']
        };
        expect(response).toEqual(expected);
    })

    test('get by pagination', async () => {
        const request = {
            pagination: {
                offset: 0,
                limit: 10
            }
        }

        const response = await getAccountService.getAccount(request);
        const expected: ExpectType = {
            accounts: [{
                id: response.accounts![0].id!,
                name: "Mohsen",
                family: "Coder",
                email: "mohsen@gmail.com",
                username: "mohsen.coder",
                role: response.accounts![0].role
            }],
            status: 'success',
            messages: ['با موفقیت دریافت شد!']
        };
        expect(response).toEqual(expected);
    })

    test('update', async () => {
        const updatedAccount = {
            id: accountId,
            name: 'ali',
            email: 'ali@gmail.com',
            username: 'ali.coder'
        }
        const accountModel = new AccountModel(updatedAccount);
        const response = await updateAccountService.updateAccount(accountModel.toDomainModel());
        const expected: ExpectType = {
            account: {
                id: accountId!,
                name: "ali",
                family: "Coder",
                email: "ali@gmail.com",
                username: "ali.coder",
                about: response.account?.about,
                role: response.account!.role,
                createAt: response.account?.createAt,
                updateAt: response.account?.updateAt
            },
            status: 'success',
            messages: ['حساب با موفقیت ویرایش شد!']
        };
        expect(response).toEqual(expected);
    })

    test('delete', async () => {
        const request = {
            id: accountId
        };
        const response = await deleteAccountService.deleteAccount(request);
        const expected: ExpectType = {
            status: 'success',
            messages: ['حساب با موفقیت حذف شد!']
        };
        expect(response).toEqual(expected);
    })
})