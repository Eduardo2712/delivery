import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, JoinColumn, Column, OneToMany, BaseEntity } from "typeorm";
import { UserEntity } from "./user.entity";
import { OrderProductEntity } from "./order-product.entity";
import { OrderStatusEntity } from "./order-status.entity";

@Entity({
    name: "orders"
})
export class OrderEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false,
        type: "unsigned big int"
    })
    ord_id_user: number;

    @Column({
        nullable: false,
        type: "decimal",
        precision: 10,
        scale: 2
    })
    ord_delivery_fee: number;

    @Column({
        nullable: false,
        type: "varchar"
    })
    ord_cep: string;

    @Column({
        nullable: false,
        type: "varchar"
    })
    ord_street: string;

    @Column({
        nullable: false,
        type: "varchar"
    })
    ord_number: string;

    @Column({
        nullable: false,
        type: "varchar"
    })
    ord_neighborhood: string;

    @Column({
        nullable: false,
        type: "varchar"
    })
    ord_city: string;

    @Column({
        nullable: false,
        type: "varchar"
    })
    ord_state: string;

    @Column({
        nullable: true,
        type: "varchar"
    })
    ord_complement: string;

    @Column({
        nullable: false,
        type: "boolean"
    })
    ord_delivered: boolean;

    @Column({
        nullable: false,
        type: "boolean"
    })
    ord_confirmed_payment: boolean;

    @Column({
        nullable: false,
        type: "boolean"
    })
    ord_is_delivery: boolean;

    @Column({
        nullable: false,
        default: true,
        type: "boolean"
    })
    ord_active: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => UserEntity, (user) => user.orders, {
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "ord_id_user" })
    user: UserEntity;

    @OneToMany(() => OrderProductEntity, (product) => product.order, {
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "ite_id_order" })
    products: OrderProductEntity[];

    @OneToMany(() => OrderStatusEntity, (order_status) => order_status.order_status, {
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "ors_id_order" })
    order_status: OrderStatusEntity[];

    constructor(partial: Partial<OrderEntity>) {
        super();
        Object.assign(this, partial);
    }
}
