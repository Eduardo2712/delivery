import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, OneToMany, BaseEntity } from "typeorm";
import { OrderEntity } from "./order.entity";
import { FileEntity } from "./file.entity";
import { UserAddressEntity } from "./user-address.entity";
import { ProductRatingEntity } from "./product-rating.entity";
import { Exclude } from "class-transformer";

@Entity({
    name: "users"
})
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false,
        type: "unsigned big int"
    })
    use_id_picture: number;

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
    use_birth_date: Date;

    @Column({
        nullable: false,
        type: "varchar"
    })
    use_phone: string;

    @Exclude()
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
        default: true,
        type: "boolean"
    })
    use_active: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToOne(() => FileEntity, (file) => file.user, {
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "use_id_picture" })
    picture: FileEntity;

    @OneToMany(() => OrderEntity, (order) => order.user, {
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "ord_id_user" })
    orders: OrderEntity[];

    @OneToMany(() => UserAddressEntity, (addresses) => addresses.user, {
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "usa_id_user" })
    addresses: UserAddressEntity[];

    @OneToMany(() => ProductRatingEntity, (rating) => rating.user, {
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "prr_id_user" })
    ratings: ProductRatingEntity[];

    constructor(partial: Partial<UserEntity>) {
        super();
        Object.assign(this, partial);
    }
}
