import { Column, Table, Model, HasMany, HasOne, BelongsTo, ForeignKey, DataType } from "sequelize-typescript";
import { Photo } from "src/photos/entities/photo.entity";

@Table({
    tableName: "products",
    defaultScope: {
        attributes: {
            exclude: ["createdAt", "updatedAt"]
        }
    }
})
export class Product extends Model<Product> {
    @Column({
        primaryKey: true
    })
    id: number;

    @Column
    pro_price: number;

    @Column
    pro_name: string;

    @Column
    pro_description: string;

    @Column
    pro_delete: boolean;

    @Column
    pro_id_type: number;

    @Column
    created_at: Date;

    @Column
    updated_at: Date;

    @ForeignKey(() => Photo)
    @Column({
        type: DataType.INTEGER
    })
    pro_id_photo: number;

    @BelongsTo(() => Photo)
    photo: Photo;
}
