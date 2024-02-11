import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne, BaseEntity } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity({
    name: "user_addresses"
})
export class UserAddressEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false,
        type: "unsigned big int"
    })
    usa_id_user: number;

    @Column({
        nullable: false,
        type: "varchar"
    })
    usa_cep: string;

    @Column({
        nullable: false,
        type: "varchar"
    })
    usa_street: string;

    @Column({
        nullable: false,
        type: "varchar"
    })
    usa_number: string;

    @Column({
        nullable: false,
        type: "varchar"
    })
    usa_neighborhood: string;

    @Column({
        nullable: true,
        type: "varchar"
    })
    usa_complement: string;

    @Column({
        nullable: false,
        type: "varchar"
    })
    usa_city: string;

    @Column({
        nullable: false,
        type: "varchar"
    })
    usa_state: string;

    @Column({
        nullable: false,
        default: true,
        type: "boolean"
    })
    usa_active: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => UserEntity, (user) => user.addresses, {
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "usa_id_user" })
    user: UserEntity;

    constructor(partial: Partial<UserAddressEntity>) {
        super();
        Object.assign(this, partial);
    }
}
