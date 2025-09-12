import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

// Import model definitions
import UserModel from "./User.js";
import AddressModel from "./Address.js";
import ProductModel from "./Product.js";
import ProductImageModel from "./ProductImage.js";
import CategoryModel from "./Category.js";
import OrderModel from "./Order.js";
import OrderItemModel from "./OrderItem.js";
import CartModel from "./Cart.js";

// Initialize models
const db = {
  User: UserModel(sequelize, DataTypes),
  Address: AddressModel(sequelize, DataTypes),
  Product: ProductModel(sequelize, DataTypes),
  ProductImage: ProductImageModel(sequelize, DataTypes),
  Category: CategoryModel(sequelize, DataTypes),
  Order: OrderModel(sequelize, DataTypes),
  OrderItem: OrderItemModel(sequelize, DataTypes),
  Cart: CartModel(sequelize, DataTypes),
};

// Apply associations if defined
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Attach sequelize instance
db.sequelize = sequelize;
db.Sequelize = sequelize.constructor;

export default db;
