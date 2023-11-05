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
        type: "int",
        default: 1
    })
    ite_quantity: number;

    @Column({
        nullable: false,
        type: "decimal",
        precision: 10,
        scale: 2
    })
    ite_price: number;

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
}
