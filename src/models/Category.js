import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
    class Category extends Model {
        static associate(models) {
            Category.hasMany(models.Product, { foreignKey: "category_id", as: "products" });
        }
    }

    Category.init(
        {
            id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
            name: { type: DataTypes.STRING, allowNull: false, unique: true }
        },
        { sequelize, modelName: "Category", tableName: "categories", timestamps: true }
    );

    return Category;
};
