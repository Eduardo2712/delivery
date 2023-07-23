import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ProductEntity } from "./product.entity";
import { OrderEntity } from "./order.entity";

@Entity({
    name: "itens"
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
        default: false,
        type: "boolean"
    })
    ite_delete: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => ProductEntity, (product) => product.itens)
    @JoinColumn({ name: "ite_id_product" })
    product: ProductEntity;

    @ManyToOne(() => OrderEntity, (order) => order.itens)
    @JoinColumn({ name: "ite_id_order" })
    order: OrderEntity;
}
