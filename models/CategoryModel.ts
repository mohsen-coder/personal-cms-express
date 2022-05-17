import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize"
import { database } from "../config/DB";

class CategoryModel extends Model<InferAttributes<CategoryModel>, InferCreationAttributes<CategoryModel>> {
    declare id: CreationOptional<string>
    declare parentId: CreationOptional<string>
    declare title: string

    static async findCategoryById(categoryId: string): Promise<CategoryModel | null> {
        return CategoryModel.findOne({ where: { id: categoryId } })
    }

    static async findCategoryByTitle(title: string): Promise<CategoryModel | null> {
        return CategoryModel.findOne({ where: { title: title } })
    }
}

CategoryModel.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    parentId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { sequelize: database, modelName: 'Category' })


export { CategoryModel }