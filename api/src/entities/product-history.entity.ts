import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { ProductEntity } from "./product.entity";

@Entity({
    name: "product_histories"
})
export class ProductHistoryEntity {
    @PrimaryColumn()
    id: number;

    @Column({
        nullable: false,
        type: "int"
    })
    prh_id_product: number;

    @Column({
        nullable: false,
        type: "decimal",
        precision: 10,
        scale: 2
    })
    prh_price: number;

    @Column({
        nullable: false,
        type: "datetime",
        default: () => "CURRENT_TIMESTAMP"
    })
    prh_date: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => ProductEntity, (product) => product.histories)
    product: ProductEntity;
}
