import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
    tableName: "users",
    defaultScope: {
        attributes: {
            exclude: ["createdAt", "updatedAt"]
        }
    },
    timestamps: false
})
export class User extends Model<User> {
    @Column({
        primaryKey: true,
        autoIncrement: true
    })
    id: number;

    @Column({
        allowNull: true,
        type: DataType.STRING
    })
    email: string;

    @Column({
        allowNull: false,
        type: DataType.STRING
    })
    use_date_birth: Date;

    @Column({
        allowNull: true,
        type: DataType.BIGINT
    })
    use_id_photo?: number;

    @Column({
        allowNull: false,
        type: DataType.STRING
    })
    use_name: string;

    @Column({
        allowNull: false,
        type: DataType.STRING
    })
    use_phone: string;

    @Column({
        allowNull: false,
        type: DataType.STRING
    })
    password: string;

    @Column({
        allowNull: false,
        type: DataType.STRING
    })
    use_cpf: string;

    @Column({
        allowNull: false,
        defaultValue: false,
        type: DataType.BOOLEAN
    })
    use_delete: boolean;

    @Column({
        defaultValue: DataType.NOW,
        allowNull: false,
        type: DataType.DATE
    })
    created_at: Date;

    @Column({
        defaultValue: DataType.NOW,
        allowNull: false,
        type: DataType.DATE
    })
    updated_at: Date;
}
