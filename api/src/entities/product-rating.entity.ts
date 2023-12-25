import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ProductEntity } from "./product.entity";
import { UserEntity } from "./user.entity";

@Entity({
    name: "product_ratings"
})
export class ProductRatingEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false,
        type: "unsigned big int"
    })
    prr_id_product: number;

    @Column({
        nullable: false,
        type: "unsigned big int"
    })
    prr_id_user: number;

    @Column({
        nullable: false,
        type: "int"
    })
    prr_rate: number;

    @Column({
        nullable: true,
        type: "text"
    })
    prr_comment: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => ProductEntity, (product) => product.ratings, { onDelete: "CASCADE" })
    @JoinColumn({ name: "prr_id_product" })
    product: ProductEntity;

    @ManyToOne(() => UserEntity, (user) => user.ratings, { onDelete: "CASCADE" })
    @JoinColumn({ name: "prr_id_user" })
    user: UserEntity;

    constructor(partial: Partial<ProductRatingEntity>) {
        Object.assign(this, partial);
    }
}
