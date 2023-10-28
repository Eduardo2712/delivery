import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ProductEntity } from "./product.entity";
import { OrderEntity } from "./order.entity";

@Entity({
    name: "items"
})
export class ItemEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false,
        type: "int"
    })
    ite_id_product: number;

    @Column({
        nullable: false,
        type: "int"
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
        nullable: false,
        default: true,
        type: "boolean"
    })
    ite_active: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => ProductEntity, (product) => product.items)
    @JoinColumn({ name: "ite_id_product" })
    product: ProductEntity;

    @ManyToOne(() => OrderEntity, (order) => order.items)
    @JoinColumn({ name: "ite_id_order" })
    order: OrderEntity;
}
