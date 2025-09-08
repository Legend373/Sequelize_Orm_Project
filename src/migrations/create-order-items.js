'use strict';

export async function up(queryInterface, Sequelize) {
    await queryInterface.createTable('order_items', {
        id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
        order_id: {
            type: Sequelize.INTEGER,
            references: { model: 'orders', key: 'id' },
            onDelete: 'CASCADE',
            allowNull: false,
        },
        product_id: {
            type: Sequelize.INTEGER,
            references: { model: 'products', key: 'id' },
            onDelete: 'SET NULL',
            allowNull: false,
        },
        quantity: { type: Sequelize.INTEGER, defaultValue: 1, allowNull: false },
        createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('NOW()') },
        updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('NOW()') },
    });
}

export async function down(queryInterface, Sequelize) {
    await queryInterface.dropTable('order_items');
}
