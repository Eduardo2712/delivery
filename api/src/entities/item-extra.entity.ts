import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ItemEntity } from "./item.entity";
import { ExtraEntity } from "./extra.entity";

@Entity({
    name: "item_extras"
})
export class ItemExtraEntity extends BaseEntity {
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
        type: "decimal",
        precision: 10,
        scale: 2
    })
    itx_price: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => ItemEntity, (item) => item.extras, {
        onDelete: "CASCADE"
    })
    @JoinColumn({
        name: "itx_id_item"
    })
    item: ItemEntity;

    @ManyToOne(() => ExtraEntity, (extra) => extra.items, {
        onDelete: "CASCADE"
    })
    @JoinColumn({
        name: "itx_id_extra"
    })
    extra: ExtraEntity;

    constructor(partial: Partial<ItemExtraEntity>) {
        super();
        Object.assign(this, partial);
    }
}
