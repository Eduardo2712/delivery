"use strict";

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
    return queryInterface.createTable("users", {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        use_id_file: {
            allowNull: false,
            type: Sequelize.INTEGER,
            references: {
                model: "files",
                key: "id"
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE"
        },
        email: {
            allowNull: false,
            type: Sequelize.STRING
        },
        use_date_birth: {
            allowNull: false,
            type: Sequelize.DATE
        },
        use_name: {
            allowNull: false,
            type: Sequelize.STRING
        },
        use_phone: {
            allowNull: false,
            type: Sequelize.STRING
        },
        password: {
            allowNull: false,
            type: Sequelize.STRING
        },
        use_cpf: {
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
    return queryInterface.dropTable("users");
}
