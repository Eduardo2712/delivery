import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ProductEntity } from "./product.entity";
import { AdminEntity } from "./admin.entity";

@Entity({
    name: "product_histories"
})
export class ProductHistoryEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false,
        type: "int"
    })
    prh_id_product: number;

    @Column({
        nullable: false,
        type: "int"
    })
    prh_id_admin: number;

    @Column({
        nullable: false,
        type: "decimal",
        precision: 10,
        scale: 2
    })
    prh_price: number;

    @Column({
        nullable: false,
        type: "datetime",
        default: () => "CURRENT_TIMESTAMP"
    })
    prh_date: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => ProductEntity, (product) => product.histories, {
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "prh_id_product" })
    product: ProductEntity;

    @ManyToOne(() => AdminEntity, (admin) => admin.product_histories, {
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "prh_id_admin" })
    admin: AdminEntity;
}
