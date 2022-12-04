import { QueryInterface, DataTypes, QueryTypes, Sequelize } from 'sequelize';

module.exports = {
  up: (queryInterface: QueryInterface): Promise<void> => queryInterface.sequelize.transaction(
    async (transaction) => {
      return queryInterface.createTable('Users', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER
        },
        username: {
          allowNull: false,
          type: DataTypes.STRING
        },
        tgid: {
          allowNull: false,
          type: DataTypes.STRING
        },
        password: {
          allowNull: false,
          type: DataTypes.STRING
        },
      });
    }
  ),

  down: (queryInterface: QueryInterface): Promise<void> => queryInterface.sequelize.transaction(
    async (transaction) => {
      // here go all migration undo changes
    }
  )
};