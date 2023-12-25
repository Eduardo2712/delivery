import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { FileEntity } from "./file.entity";
import { ProductEntity } from "./product.entity";
import { ItemExtraEntity } from "./item-extra.entity";

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
    pex_id_file: number;

    @Column({
        nullable: false,
        type: "unsigned big int"
    })
    pex_id_product: number;

    @Column({
        nullable: false,
        type: "text"
    })
    pex_description: string;

    @Column({
        nullable: false,
        type: "decimal"
    })
    pex_price: number;

    @Column({
        nullable: false,
        type: "boolean",
        default: true
    })
    pex_status: boolean;

    @Column({
        nullable: false,
        default: true,
        type: "boolean"
    })
    pex_active: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToOne(() => FileEntity, (file) => file.extra, {
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "pex_id_file" })
    file: FileEntity;

    @OneToOne(() => ProductEntity, (product) => product.extra, {
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "pex_id_product" })
    product: ProductEntity;

    @OneToOne(() => ItemExtraEntity, (item) => item.extra, {
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "itx_id_extra" })
    extra: ItemExtraEntity;

    constructor(partial: Partial<ProductExtraEntity>) {
        Object.assign(this, partial);
    }
}
