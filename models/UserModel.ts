import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize"
import { database } from "../config/DB";

class UserModel extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>> {
    declare id: CreationOptional<string>
    declare name: string
    declare family: string
    declare email: string
    declare password: string

    static async getUserById(userId: string): Promise<UserModel | null> {
        return UserModel.findOne({ where: { id: userId } })
    }

    static async getUserByEmail(email: string): Promise<UserModel | null> {
        return UserModel.findOne({ where: { email: email } })
    }
}

UserModel.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    family: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { sequelize: database, modelName: 'User' })


export { UserModel }