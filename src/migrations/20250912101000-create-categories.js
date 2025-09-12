'use strict';

export async function up(queryInterface, Sequelize) {
    await queryInterface.createTable('categories', {
        id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
        name: { type: Sequelize.STRING, allowNull: false, unique: true },
        createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('NOW()') },
        updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('NOW()') },
    });
}

export async function down(queryInterface, Sequelize) {
    await queryInterface.dropTable('categories');
}
