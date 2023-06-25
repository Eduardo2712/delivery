import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
    tableName: "files"
})
export class File extends Model<File> {
    @Column({
        allowNull: false,
        type: DataType.TEXT
    })
    fil_url: string;
}
