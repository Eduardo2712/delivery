import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { OrderProductEntity } from "./order-product.entity";
import { ExtraEntity } from "./extra.entity";

@Entity({
    name: "order_product_extras"
})
export class OrderProductExtraEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false,
        type: "unsigned big int"
    })
    ope_id_item: number;

    @Column({
        nullable: false,
        type: "unsigned big int"
    })
    ope_id_extra: number;

    @Column({
        nullable: false,
        type: "decimal",
        precision: 10,
        scale: 2
    })
    ope_price: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => OrderProductEntity, (product) => product.products, {
        onDelete: "CASCADE"
    })
    @JoinColumn({
        name: "ope_id_item"
    })
    product: OrderProductEntity;

    @ManyToOne(() => ExtraEntity, (extra) => extra.products, {
        onDelete: "CASCADE"
    })
    @JoinColumn({
        name: "ope_id_extra"
    })
    extra: ExtraEntity;

    constructor(partial: Partial<OrderProductExtraEntity>) {
        super();
        Object.assign(this, partial);
    }
}
