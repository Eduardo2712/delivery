import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ExtraEntity } from "./extra.entity";
import { ProductEntity } from "./product.entity";

@Entity({
    name: "product_extras"
})
export class ProductExtraEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false,
        type: "unsigned big int"
    })
    pre_id_product: number;

    @Column({
        nullable: false,
        type: "unsigned big int"
    })
    pre_id_extra: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => ExtraEntity, (extra) => extra.products, {
        onDelete: "CASCADE"
    })
    @JoinColumn({
        name: "pre_id_extra"
    })
    extra: ExtraEntity;

    @ManyToOne(() => ProductEntity, (product) => product.extras, {
        onDelete: "CASCADE"
    })
    @JoinColumn({
        name: "pre_id_product"
    })
    product: ProductEntity;

    constructor(partial: Partial<ProductExtraEntity>) {
        Object.assign(this, partial);
    }
}
