import sequelize from "../config/sequelize.js";
import User from "./User.js";
import Address from "./Address.js";
import Product from "./Product.js";
import ProductImage from "./ProductImage.js";
import Category from "./Category.js";
import Order from "./Order.js";
import OrderItem from "./OrderItem.js";
import Cart from "./Cart.js";
import { DataTypes } from "sequelize";

const db = {
  User,
  Address,
  Product,
  ProductImage,
  Category,
  Order,
  OrderItem,
  Cart,
};

// Initialize models with Sequelize
Object.values(db).forEach(model => {
  if (typeof model === "function") {
    model(sequelize, DataTypes);
  }
});

// Apply associations
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = sequelize.constructor;

export default db;
