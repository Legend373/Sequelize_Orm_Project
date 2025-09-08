import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
    class ProductImage extends Model {
        static associate(models) {
            ProductImage.belongsTo(models.Product, { foreignKey: "product_id", as: "product" });
        }
    }

    ProductImage.init(
        {
            id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
            image: { type: DataTypes.TEXT, allowNull: false },
            product_id: { type: DataTypes.INTEGER, allowNull: false }
        },
        { sequelize, modelName: "ProductImage", tableName: "product_images", timestamps: true }
    );

    return ProductImage;
};
