import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { OrderEntity } from "./order.entity";
import { FileEntity } from "./file.entity";

@Entity({
    name: "users"
})
export class UserEntity {
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

    @OneToOne(() => FileEntity, { cascade: true, eager: true })
    @JoinColumn({ name: "use_id_picture" })
    picture: FileEntity;

    @OneToMany(() => OrderEntity, (order) => order.user)
    @JoinColumn({ name: "ord_id_user" })
    orders: OrderEntity[];
}
