import {ResponseBase} from "./ResponseBase";
import {Account} from "../../../../domain/Account";

export class AccountResponse extends ResponseBase {
    account?: Account
    accounts?: Account[]
}