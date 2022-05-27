import {ResponseBase} from "./ResponseBase";

export class AccountResponse extends ResponseBase {
    account: object | null = null
    accounts: object[] | null = null
}