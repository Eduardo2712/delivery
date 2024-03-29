import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: "shopping_carts"
})
export class ShoppingCartEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "unsigned big int",
        nullable: false
    })
    shc_id_user: number;
}
