module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('membership_plans', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    duration: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    price: {
      type: Sequelize.DECIMAL,
      allowNull: false,
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  }),

  down: (queryInterface) => queryInterface.dropTable('membership_plans'),
};
