import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn } from "typeorm";
import { ProductFileEntity } from "./product-file.entity";
import { ItemEntity } from "./item.entity";
import { ProductHistoryEntity } from "./product-history.entity";

@Entity({
    name: "products"
})
export class ProductEntity {
    @PrimaryGeneratedColumn()
    id: number;

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

    @OneToMany(() => ProductFileEntity, (productFile) => productFile.product)
    @JoinColumn({ name: "prl_id_product" })
    files: ProductFileEntity[];

    @OneToMany(() => ItemEntity, (item) => item.product)
    @JoinColumn({ name: "ite_id_product" })
    itens: ItemEntity[];

    @OneToMany(() => ProductHistoryEntity, (productHistory) => productHistory.product)
    @JoinColumn({ name: "prh_id_product" })
    histories: ProductHistoryEntity[];
}
