'use strict';

const tableName = 'users';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { STRING, BOOLEAN, INTEGER, DATE } = Sequelize;

    await queryInterface.createTable(
      tableName,
      {
        id: {
          type: INTEGER,
          primaryKey: true,
          autoIncrement: true,
          comment: 'id',
        },
        username: { type: STRING(50), allowNull: false, comment: '用户名' },
        first_name: {
          type: STRING(20),
          allowNull: false,
          comment: 'first  name',
        },
        last_name: {
          type: STRING(20),
          allowNull: false,
          comment: 'last name',
        },
        created_at: {
          type: DATE,
          allowNull: false,
          comment: '创建时间',
        },
        updated_at: {
          type: DATE,
          allowNull: false,
          comment: '更新时间',
        },
        version: {
          type: INTEGER,
          defaultValue: 0,
          allowNull: false,
          comment: '更新版本',
        },
        is_deleted: {
          defaultValue: false,
          type: BOOLEAN,
          allowNull: false,
          comment: '是否删除',
        },
      },
      {
        charset: 'utf8',
      },
    );

    await queryInterface.addIndex(tableName, ['username'], {
      unique: true,
      name: `idx_username`,
    });
  },

  down: async (queryInterface) => {
    return queryInterface.dropTable(tableName);
  },
};
