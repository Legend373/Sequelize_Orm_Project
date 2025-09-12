'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.addColumn('users', 'role', {
    type: Sequelize.ENUM('user', 'admin'),
    allowNull: false,
    defaultValue: 'user',
  });
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.removeColumn('users', 'role');
  // Optional: Remove ENUM type from Postgres
  if (queryInterface.sequelize.getDialect() === 'postgres') {
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_users_role";');
  }
}
