import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
    class Cart extends Model {
        static associate(models) {
            Cart.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
            Cart.hasMany(models.Product, { foreignKey: "cart_id", as: "products" });
        }
    }

    Cart.init(
        {
            id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
            user_id: { type: DataTypes.INTEGER, allowNull: false }
        },
        { sequelize, modelName: "Cart", tableName: "carts", timestamps: true }
    );

    return Cart;
};
