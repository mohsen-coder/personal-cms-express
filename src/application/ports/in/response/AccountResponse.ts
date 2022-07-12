import {ResponseBase} from "./ResponseBase";
import {AccountModel} from "../../../../adapters/in/express/model/AccountModel";

export class AccountResponse extends ResponseBase {
    account: AccountModel;
    accounts: AccountModel[];
    count: number;
}