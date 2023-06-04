import { Column, Model, Table } from "sequelize-typescript";

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
        allowNull: true
    })
    email: string;

    @Column({
        allowNull: false
    })
    use_date_birth: Date;

    @Column
    use_id_photo?: number;

    @Column({
        allowNull: false
    })
    use_name: string;

    @Column
    use_phone: string;

    @Column
    password: string;

    @Column
    use_cpf: string;

    @Column
    use_delete: boolean;

    @Column
    created_at: Date;

    @Column
    updated_at: Date;
}
