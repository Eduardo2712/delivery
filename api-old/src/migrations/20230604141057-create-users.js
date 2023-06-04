"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("users", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            use_name: {
                allowNull: false,
                type: Sequelize.STRING
            },
            use_phone: {
                allowNull: false,
                type: Sequelize.STRING
            },
            use_cpf: {
                allowNull: false,
                type: Sequelize.STRING
            },
            use_date_birth: {
                allowNull: false,
                type: Sequelize.DATE
            },
            email: {
                allowNull: false,
                type: Sequelize.STRING
            },
            password: {
                allowNull: false,
                type: Sequelize.STRING
            },
            use_delete: {
                allowNull: false,
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
            }
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("users");
    }
};
