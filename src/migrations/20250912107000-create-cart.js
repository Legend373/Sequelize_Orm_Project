'use strict';

export async function up(queryInterface, Sequelize) {
    await queryInterface.createTable('carts', {
        id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
        user_id: {
            type: Sequelize.INTEGER,
            references: { model: 'users', key: 'id' },
            onDelete: 'CASCADE',
            allowNull: false,
        },
        product_id: {
            type: Sequelize.INTEGER,
            references: { model: 'products', key: 'id' },
            onDelete: 'CASCADE',
            allowNull: false,
        },
        quantity: { type: Sequelize.INTEGER, defaultValue: 1, allowNull: false },
        createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('NOW()') },
        updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('NOW()') },
    });
}

export async function down(queryInterface, Sequelize) {
    await queryInterface.dropTable('carts');
}
