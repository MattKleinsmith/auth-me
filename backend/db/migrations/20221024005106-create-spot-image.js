'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SpotImages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      spotId: {
        type: Sequelize.INTEGER
      },
      url: {
        type: Sequelize.STRING
      },
      preview: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      }
    });

    await queryInterface.addConstraint('SpotImages', {
      fields: ['spotId', 'preview'],
      type: 'unique',
      name: 'at-most-one-preview-per-spot',
      where: {
        preview: true
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('SpotImages');

    await queryInterface.removeConstraint('SpotImages', 'at-most-one-preview-per-spot')
  }
};
