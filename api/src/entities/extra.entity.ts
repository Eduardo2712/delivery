import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { FileEntity } from "./file.entity";
import { ProductExtraEntity } from "./product-extra.entity";
import { ItemExtraEntity } from "./item-extra.entity";

@Entity({
    name: "extras"
})
export class ExtraEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: true,
        type: "unsigned big int"
    })
    ext_id_picture: number;

    @Column({
        nullable: false,
        type: "varchar"
    })
    ext_name: string;

    @Column({
        nullable: false,
        type: "decimal",
        precision: 10,
        scale: 2
    })
    ext_price: number;

    @Column({
        nullable: false,
        type: "boolean",
        default: true
    })
    ext_status: boolean;

    @Column({
        nullable: false,
        type: "boolean",
        default: true
    })
    ext_active: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToOne(() => FileEntity, (image) => image.extra, { onDelete: "CASCADE" })
    @JoinColumn({ name: "ext_id_picture" })
    image: FileEntity;

    @OneToMany(() => ProductExtraEntity, (extra) => extra.product, {
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "pre_id_product" })
    products: ProductExtraEntity[];

    @OneToMany(() => ItemExtraEntity, (extra) => extra.item, {
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "itx_id_extra" })
    items: ItemExtraEntity[];

    constructor(partial: Partial<ExtraEntity>) {
        super();
        Object.assign(this, partial);
    }
}
