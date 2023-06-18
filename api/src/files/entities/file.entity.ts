import { Column, DataType, HasMany, HasOne, Model, Table } from "sequelize-typescript";
import { ProductFile } from "src/product_files/entities/product_file.entity";
import { User } from "src/users/entities/user.entity";

@Table({
    tableName: "files",
    defaultScope: {
        attributes: {
            exclude: ["createdAt", "updatedAt"]
        }
    },
    timestamps: false
})
export class File extends Model<File> {
    @Column({
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataType.INTEGER
    })
    id: number;

    @Column({
        allowNull: false,
        type: DataType.TEXT
    })
    fil_url: string;

    @Column({
        allowNull: false,
        type: DataType.BOOLEAN
    })
    fil_delete: boolean;

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

    @HasOne(() => User)
    user: User;

    @HasMany(() => ProductFile)
    products: ProductFile;
}
