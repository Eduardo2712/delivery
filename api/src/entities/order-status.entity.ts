import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { OrderEntity } from "./order.entity";
import { StatusEntity } from "./status.entity";

@Entity({
    name: "order_status"
})
export class OrderStatusEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false,
        type: "int"
    })
    ors_id_status: number;

    @Column({
        nullable: false,
        type: "int"
    })
    ors_id_order: number;

    @Column({
        nullable: false,
        type: "boolean"
    })
    ors_active: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => StatusEntity, (status) => status.status, {
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "ors_id_status" })
    status: StatusEntity;

    @ManyToOne(() => OrderEntity, (order) => order.order_status, {
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "ors_id_order" })
    order_status: OrderEntity;
}
