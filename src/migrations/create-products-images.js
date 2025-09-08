'use strict';

export async function up(queryInterface, Sequelize) {
    await queryInterface.createTable('product_images', {
        id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
        image: { type: Sequelize.STRING, allowNull: false },
        product_id: {
            type: Sequelize.INTEGER,
            references: { model: 'products', key: 'id' },
            onDelete: 'CASCADE',
            allowNull: false,
        },
        createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('NOW()') },
        updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('NOW()') },
    });
}

export async function down(queryInterface, Sequelize) {
    await queryInterface.dropTable('product_images');
}
