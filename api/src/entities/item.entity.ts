import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ProductEntity } from "./product.entity";
import { OrderEntity } from "./order.entity";
import { ItemExtraEntity } from "./item-extra.entity";

@Entity({
    name: "items"
})
export class ItemEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false,
        type: "unsigned big int"
    })
    ite_id_product: number;

    @Column({
        nullable: false,
        type: "unsigned big int"
    })
    ite_id_order: number;

    @Column({
        nullable: false,
        type: "decimal",
        precision: 10,
        scale: 2
    })
    ite_price: number;

    @Column({
        nullable: true,
        type: "text"
    })
    ite_comment: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => ProductEntity, (product) => product.items, {
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "ite_id_product" })
    product: ProductEntity;

    @ManyToOne(() => OrderEntity, (order) => order.items, {
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "ite_id_order" })
    order: OrderEntity;

    @OneToOne(() => ItemExtraEntity, (item_extra) => item_extra.item, {
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "itx_id_extra" })
    extra: ItemExtraEntity;
}
