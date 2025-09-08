'use strict';

export async function up(queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
        id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
        name: { type: Sequelize.STRING, allowNull: false },
        description: { type: Sequelize.TEXT },
        price: { type: Sequelize.INTEGER, allowNull: false },
        category_id: {
            type: Sequelize.INTEGER,
            references: { model: 'categories', key: 'id' },
            onDelete: 'SET NULL',
        },
        quantity: { type: Sequelize.INTEGER, defaultValue: 0 },
        createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('NOW()') },
        updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('NOW()') },
    });
}

export async function down(queryInterface, Sequelize) {
    await queryInterface.dropTable('products');
}
