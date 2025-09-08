import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
    class Order extends Model {
        static associate(models) {
            Order.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
            Order.hasMany(models.OrderItem, { foreignKey: "order_id", as: "order_items" });
        }
    }

    Order.init(
        {
            id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
            user_id: { type: DataTypes.INTEGER, allowNull: false }
        },
        { sequelize, modelName: "Order", tableName: "orders", timestamps: true }
    );

    return Order;
};
