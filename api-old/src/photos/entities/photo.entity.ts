import { Column, HasOne, Model, Table } from "sequelize-typescript";
import { Product } from "src/products/entities/product.entity";

@Table({
    tableName: "photos",
    defaultScope: {
        attributes: {
            exclude: ["createdAt", "updatedAt"]
        }
    }
})
export class Photo extends Model<Photo> {
    @Column({
        primaryKey: true,
        autoIncrement: true
    })
    id: number;

    @Column
    pho_size: number;

    @Column
    pho_name: string;

    @Column
    pho_delete: boolean;

    @Column
    pho_path: string;

    @Column
    created_at: Date;

    @Column
    updated_at: Date;

    @HasOne(() => Product)
    product: Product;
}
