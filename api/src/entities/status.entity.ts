import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { OrderStatusEntity } from "./order-status.entity";

@Entity({
    name: "status"
})
export class StatusEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false,
        type: "varchar"
    })
    sta_name: string;

    @Column({
        nullable: false,
        type: "varchar"
    })
    sta_color: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToMany(() => OrderStatusEntity, (order_status) => order_status.status, {
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "ors_id_status" })
    status: OrderStatusEntity;
}
