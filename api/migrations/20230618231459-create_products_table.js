"use strict";

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
    return queryInterface.createTable("products", {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        pro_id_type: {
            allowNull: false,
            type: Sequelize.INTEGER
        },
        pro_price: {
            allowNull: false,
            type: Sequelize.DECIMAL
        },
        pro_name: {
            allowNull: false,
            type: Sequelize.STRING
        },
        pro_description: {
            allowNull: false,
            type: Sequelize.STRING
        },
        pro_delete: {
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
    return queryInterface.dropTable("products");
}
