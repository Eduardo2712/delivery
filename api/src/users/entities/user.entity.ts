import { Column, Model, Table } from "sequelize-typescript";

@Table({
    tableName: "user",
    defaultScope: {
        attributes: {
            exclude: ["createdAt", "updatedAt"]
        }
    }
})
export class User extends Model<User> {
    @Column({
        primaryKey: true
    })
    id: number;

    @Column
    email: string;

    @Column
    use_date_birth: Date;

    @Column
    use_id_photo?: number;

    @Column
    use_name: string;

    @Column
    use_phone: string;

    @Column
    password: string;

    @Column
    use_cpf: string;

    @Column
    use_delete: boolean;
}
