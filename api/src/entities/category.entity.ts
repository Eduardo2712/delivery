import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ProductEntity } from "./product.entity";

@Entity({
    name: "category"
})
export class CategoryEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false,
        type: "varchar"
    })
    cat_name: string;

    @Column({
        nullable: false,
        type: "boolean",
        default: true
    })
    cat_active: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToMany(() => ProductEntity, (product) => product.category, { onDelete: "CASCADE" })
    @JoinColumn({ name: "pro_id_category" })
    products: ProductEntity[];
}
