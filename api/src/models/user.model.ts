import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { File } from "./file.model";

@Table({
    tableName: "users"
})
export class User extends Model<User> {
    @ForeignKey(() => File)
    @Column({
        allowNull: true,
        type: DataType.INTEGER
    })
    use_id_photo: number;

    @Column({
        allowNull: false,
        type: DataType.STRING
    })
    email: string;

    @Column({
        allowNull: false,
        type: DataType.DATE
    })
    use_date_birth: Date;

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

    @BelongsTo(() => File)
    photo: File;
}
