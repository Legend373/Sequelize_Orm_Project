'use strict';
export async function up(queryInterface, Sequelize) {
  await queryInterface.addColumn("products", "cart_id", {
    type: Sequelize.INTEGER,
    allowNull: true, // keep it nullable at first to avoid errors
    references: {
      model: "carts", // name of your carts table
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL", // if cart is deleted, product is not deleted
  });
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.removeColumn("products", "cart_id");
}
