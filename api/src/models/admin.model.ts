import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { File } from "src/models/file.model";

@Table({
    tableName: "admins"
})
export class Admin extends Model<Admin> {
    @ForeignKey(() => File)
    @Column({
        allowNull: true,
        type: DataType.INTEGER
    })
    adm_id_photo: number;

    @Column({
        allowNull: false,
        type: DataType.STRING
    })
    adm_name: string;

    @Column({
        allowNull: false,
        type: DataType.STRING
    })
    email: string;

    @Column({
        allowNull: false,
        type: DataType.DATE
    })
    adm_date_birth: Date;

    @Column({
        allowNull: false,
        type: DataType.STRING
    })
    password: string;

    @Column({
        allowNull: false,
        type: DataType.STRING
    })
    adm_phone: string;

    @Column({
        allowNull: false,
        type: DataType.STRING
    })
    adm_cpf: string;

    @Column({
        allowNull: false,
        defaultValue: false,
        type: DataType.BOOLEAN
    })
    adm_delete: boolean;

    @BelongsTo(() => File)
    photo: File;
}
