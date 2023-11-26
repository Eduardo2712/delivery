import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}
