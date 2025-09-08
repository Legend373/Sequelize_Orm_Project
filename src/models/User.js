import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            User.hasOne(models.Cart, { foreignKey: "user_id", as: "cart" });
            User.hasMany(models.Address, { foreignKey: "user_id", as: "addresses" });
            User.hasMany(models.Order, { foreignKey: "user_id", as: "orders" });
        }
    }

    User.init(
        {
            id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
            first_name: { type: DataTypes.STRING, allowNull: false },
            last_name: { type: DataTypes.STRING, allowNull: false },
            phone_number: { type: DataTypes.STRING, allowNull: false }
        },
        { sequelize, modelName: "User", tableName: "users", timestamps: true }
    );

    return User;
};
