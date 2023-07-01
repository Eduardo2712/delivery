import { File } from "src/files/entities/file.entity";
import { Order } from "src/orders/entities/order.entity";
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, OneToMany } from "typeorm";

@Entity({
    name: "users"
})
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false,
        type: "varchar"
    })
    use_name: string;

    @Column({
        nullable: false,
        type: "varchar"
    })
    email: string;

    @Column({
        nullable: false,
        type: "date"
    })
    use_date_birth: Date;

    @Column({
        nullable: false,
        type: "varchar"
    })
    use_phone: string;

    @Column({
        nullable: false,
        type: "varchar"
    })
    password: string;

    @Column({
        nullable: false,
        type: "varchar"
    })
    use_cpf: string;

    @Column({
        nullable: false,
        default: false,
        type: "boolean"
    })
    use_delete: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToOne(() => File, { cascade: true, eager: true })
    @JoinColumn({ name: "use_id_picture" })
    picture: File;

    @OneToMany(() => Order, (order) => order.user)
    @JoinColumn({ name: "ord_id_user" })
    orders: Order[];
}
