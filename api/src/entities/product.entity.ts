import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn, ManyToOne } from "typeorm";
import { ProductFileEntity } from "./product-file.entity";
import { ItemEntity } from "./item.entity";
import { ProductHistoryEntity } from "./product-history.entity";
import { CategoryEntity } from "./category.entity";

@Entity({
    name: "products"
})
export class ProductEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false,
        type: "int"
    })
    pro_id_category: number;

    @Column({
        nullable: false,
        type: "varchar"
    })
    pro_name: string;

    @Column({
        nullable: false,
        type: "text"
    })
    pro_description: string;

    @Column({
        nullable: false,
        type: "text"
    })
    pro_ingredients: string;

    @Column({
        nullable: false,
        type: "int",
        default: 1
    })
    pro_number_people: number;

    @Column({
        nullable: false,
        type: "decimal",
        precision: 10,
        scale: 2
    })
    pro_price: number;

    @Column({
        nullable: false,
        type: "boolean",
        default: true
    })
    pro_status: boolean;

    @Column({
        nullable: false,
        default: true,
        type: "boolean"
    })
    pro_active: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToMany(() => ProductFileEntity, (product_file) => product_file.product, {
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "prl_id_product" })
    files: ProductFileEntity[];

    @OneToMany(() => ItemEntity, (item) => item.product, {
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "ite_id_product" })
    items: ItemEntity[];

    @OneToMany(() => ProductHistoryEntity, (product_history) => product_history.product, {
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "prh_id_product" })
    histories: ProductHistoryEntity[];

    @ManyToOne(() => CategoryEntity, (category) => category.products, { onDelete: "CASCADE" })
    @JoinColumn({ name: "pro_id_category" })
    category: CategoryEntity;
}
