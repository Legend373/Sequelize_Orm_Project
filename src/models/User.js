import { Model } from "sequelize";
import bcrypt from "bcrypt";

export default (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            User.hasOne(models.Cart, { foreignKey: "user_id", as: "cart" });
            User.hasMany(models.Address, { foreignKey: "user_id", as: "addresses" });
            User.hasMany(models.Order, { foreignKey: "user_id", as: "orders" });
        }

        // Method to check password
        async validatePassword(password) {
            return await bcrypt.compare(password, this.password);
        }
    }

    User.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            first_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            last_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            phone_number: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: true,
                },
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            role: {
                type: DataTypes.ENUM("user", "admin"), // predefined roles
                allowNull: false,
                defaultValue: "user",

            },
        },
        {
            sequelize,
            modelName: "User",
            tableName: "users",
            timestamps: true,
            hooks: {
                beforeCreate: async (user) => {
                    if (user.password) {
                        const salt = await bcrypt.genSalt(10);
                        user.password = await bcrypt.hash(user.password, salt);
                    }
                },
                beforeUpdate: async (user) => {
                    if (user.changed("password")) {
                        const salt = await bcrypt.genSalt(10);
                        user.password = await bcrypt.hash(user.password, salt);
                    }
                },
            },
        }
    );

    return User;
};
