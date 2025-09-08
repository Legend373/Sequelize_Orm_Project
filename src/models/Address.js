import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
    class Address extends Model {
        static associate(models) {
            Address.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
        }
    }

    Address.init(
        {
            id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
            name: { type: DataTypes.STRING, allowNull: false },
            user_id: { type: DataTypes.INTEGER, allowNull: false }
        },
        { sequelize, modelName: "Address", tableName: "addresses", timestamps: true }
    );

    return Address;
};
