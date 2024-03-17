import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: "coupons"
})
export class CouponEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "varchar",
        nullable: false
    })
    cup_name: string;

    @Column({
        type: "decimal",
        precision: 10,
        scale: 2,
        nullable: false
    })
    cup_value: number;

    @Column({
        type: "int",
        nullable: false
    })
    cup_qtd: number;

    @Column({
        type: "datetime",
        nullable: false
    })
    cup_start_date: Date;

    @Column({
        type: "datetime",
        nullable: true
    })
    cup_end_date: Date;

    @Column({
        type: "varchar",
        nullable: false,
        default: true
    })
    cup_active: boolean;

    constructor(partial: Partial<CouponEntity>) {
        super();
        Object.assign(this, partial);
    }
}
