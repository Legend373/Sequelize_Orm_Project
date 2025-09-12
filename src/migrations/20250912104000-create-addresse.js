'use strict';

export async function up(queryInterface, Sequelize) {
    await queryInterface.createTable('addresses', {
        id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
        name: { type: Sequelize.STRING, allowNull: false },
        user_id: {
            type: Sequelize.INTEGER,
            references: { model: 'users', key: 'id' },
            onDelete: 'CASCADE',
            allowNull: false,
        },
        createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('NOW()') },
        updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('NOW()') },
    });
}

export async function down(queryInterface, Sequelize) {
    await queryInterface.dropTable('addresses');
}
