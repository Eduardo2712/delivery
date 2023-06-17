import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { File } from "src/files/entities/file.entity";
import { Product } from "src/products/entities/product.entity";

@Table({
    tableName: "product_files",
    defaultScope: {
        attributes: {
            exclude: ["createdAt", "updatedAt"]
        }
    },
    timestamps: false
})
export class ProductFile extends Model<ProductFile> {
    @Column({
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataType.INTEGER
    })
    id: number;

    @ForeignKey(() => File)
    @Column
    pfi_id_file: number;

    @ForeignKey(() => Product)
    @Column
    pfi_id_product: number;

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

    @BelongsTo(() => File)
    file: File;

    @BelongsTo(() => Product)
    product: Product;
}
