import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ProductEntity } from "./product.entity";
import { OrderEntity } from "./order.entity";
import { OrderProductExtraEntity } from "./order-product-extra.entity";

@Entity({
    name: "order_products"
})
export class OrderProductEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false,
        type: "unsigned big int"
    })
    orp_id_product: number;

    @Column({
        nullable: false,
        type: "unsigned big int"
    })
    orp_id_order: number;

    @Column({
        nullable: false,
        type: "decimal",
        precision: 10,
        scale: 2
    })
    orp_price: number;

    @Column({
        nullable: true,
        type: "text"
    })
    orp_comment: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => ProductEntity, (product) => product.products, {
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "orp_id_product" })
    product: ProductEntity;

    @ManyToOne(() => OrderEntity, (order) => order.products, {
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "orp_id_order" })
    order: OrderEntity;

    @OneToMany(() => OrderProductExtraEntity, (extra) => extra.product, {
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "itx_id_item" })
    products: OrderProductExtraEntity[];

    constructor(partial: Partial<OrderProductEntity>) {
        super();
        Object.assign(this, partial);
    }
}
