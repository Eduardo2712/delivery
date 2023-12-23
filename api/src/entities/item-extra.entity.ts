import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ItemEntity } from "./item.entity";
import { ProductExtraEntity } from "./product-extra.entity";

@Entity({
    name: "item_extras"
})
export class ItemExtraEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false,
        type: "unsigned big int"
    })
    itx_id_item: number;

    @Column({
        nullable: false,
        type: "unsigned big int"
    })
    itx_id_extra: number;

    @Column({
        nullable: false,
        type: "decimal"
    })
    itx_price: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToOne(() => ProductExtraEntity, (extra) => extra.extra, {
        onDelete: "CASCADE"
    })
    @JoinColumn({
        name: "itx_id_extra"
    })
    extra: ProductExtraEntity;

    @OneToOne(() => ItemEntity, (item) => item.extra, {
        onDelete: "CASCADE"
    })
    @JoinColumn({
        name: "itx_id_item"
    })
    item: ItemEntity;
}
