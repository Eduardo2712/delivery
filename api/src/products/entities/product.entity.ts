import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity({
    name: "products"
})
export class Product {
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
        type: "integer"
    })
    pro_id_type: number;

    @Column({
        nullable: false,
        default: false,
        type: "boolean"
    })
    pro_delete: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
