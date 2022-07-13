import { DataSource } from "typeorm";
import { AccountModel } from "../src/adapters/out/persistence/models/AccountModel";
import { FileModel } from "../src/adapters/out/persistence/models/FileModel";
import { CategoryModel } from "../src/adapters/out/persistence/models/CategoryModel";
import { PostModel } from "../src/adapters/out/persistence/models/PostModel";
import { CommentModel } from "../src/adapters/out/persistence/models/CommentModel";
import { MessageModel } from "../src/adapters/out/persistence/models/MessageModel";
import { SettingModel } from "../src/adapters/out/persistence/models/SettingModel";
import { SocialNetworkModel } from "../src/adapters/out/persistence/models/SocialNetworkModel";


export const db = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "123456789",
    database: "typeorm_test",
    synchronize: true,
    entities: [
        AccountModel,
        PostModel,
        CategoryModel,
        FileModel,
        CommentModel,
        MessageModel,
        SettingModel,
        SocialNetworkModel
        // path.join(__dirname, "../src/adapters/out/persistence/models/*.ts")
    ]
})