"use strict";

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
    return queryInterface.createTable("files", {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        fil_url: {
            allowNull: false,
            type: Sequelize.TEXT
        },
        fil_delete: {
            allowNull: false,
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        created_at: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: DataTypes.NOW
        },
        updated_at: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: DataTypes.NOW
        }
    });
}

export async function down(queryInterface) {
    return queryInterface.dropTable("files");
}
