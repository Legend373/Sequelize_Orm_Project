import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
    class Product extends Model {
        static associate(models) {
            Product.belongsTo(models.Category, { foreignKey: "category_id", as: "category" });
            Product.belongsTo(models.Cart, { foreignKey: "cart_id", as: "cart" });
            Product.hasMany(models.ProductImage, { foreignKey: "product_id", as: "images" });
            Product.hasMany(models.OrderItem, { foreignKey: "product_id", as: "order_items" });
        }
    }

    Product.init(
        {
            id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
            name: { type: DataTypes.STRING, allowNull: false },
            description: { type: DataTypes.TEXT, allowNull: true },
            price: { type: DataTypes.INTEGER, allowNull: false },
            quantity: { type: DataTypes.INTEGER, allowNull: false },
            category_id: { type: DataTypes.INTEGER, allowNull: false },
            cart_id: { type: DataTypes.INTEGER, allowNull: true }
        },
        { sequelize, modelName: "Product", tableName: "products", timestamps: true }
    );

    return Product;
};
