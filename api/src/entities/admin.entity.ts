import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { FileEntity } from "./file.entity";
import { ProductHistoryEntity } from "./product-history.entity";
import { Exclude } from "class-transformer";

@Entity({
    name: "admins"
})
export class AdminEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: true,
        type: "unsigned big int"
    })
    adm_id_picture: number;

    @Column({
        nullable: false,
        type: "varchar"
    })
    adm_name: string;

    @Column({
        nullable: false,
        type: "varchar"
    })
    email: string;

    @Column({
        nullable: false,
        type: "varchar"
    })
    adm_phone: string;

    @Exclude()
    @Column({
        nullable: false,
        type: "varchar"
    })
    password: string;

    @Column({
        nullable: false,
        default: true,
        type: "boolean"
    })
    adm_status: boolean;

    @Column({
        nullable: false,
        default: true,
        type: "boolean"
    })
    adm_active: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToOne(() => FileEntity, (file) => file.admin)
    @JoinColumn({ name: "adm_id_picture" })
    picture: FileEntity;

    @OneToMany(() => ProductHistoryEntity, (product_history) => product_history.admin, {
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "prh_id_admin" })
    product_histories: ProductHistoryEntity[];

    constructor(partial: Partial<AdminEntity>) {
        super();
        Object.assign(this, partial);
    }
}
