import { User } from "src/users/entities/user.entity";
import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, JoinColumn, Column } from "typeorm";

@Entity({
    name: "orders"
})
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

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
    ord_delivery: boolean;

    @Column({
        nullable: false,
        default: false,
        type: "boolean"
    })
    ord_delete: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => User, (user) => user.orders)
    @JoinColumn({ name: "ord_id_user" })
    user: User;
}
