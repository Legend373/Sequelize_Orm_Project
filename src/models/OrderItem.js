import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
    class OrderItem extends Model {
        static associate(models) {
            OrderItem.belongsTo(models.Order, { foreignKey: "order_id", as: "order" });
            OrderItem.belongsTo(models.Product, { foreignKey: "product_id", as: "product" });
        }
    }

    OrderItem.init(
        {
            id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
            order_id: { type: DataTypes.INTEGER, allowNull: false },
            product_id: { type: DataTypes.INTEGER, allowNull: false },
            quantity: { type: DataTypes.INTEGER, allowNull: false }
        },
        { sequelize, modelName: "OrderItem", tableName: "order_items", timestamps: true }
    );

    return OrderItem;
};
