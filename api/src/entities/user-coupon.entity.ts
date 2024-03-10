import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: "user_coupons"
})
export class UserCouponEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "varchar",
        nullable: false
    })
    cuu_name: string;

    @Column({
        type: "decimal",
        precision: 10,
        scale: 2,
        nullable: false
    })
    cuu_value: number;

    @Column({
        type: "datetime",
        nullable: false
    })
    cuu_start_date: Date;

    @Column({
        type: "datetime",
        nullable: true
    })
    cuu_end_date: Date;

    @Column({
        type: "varchar",
        nullable: false
    })
    cuu_active: boolean;

    constructor(partial: Partial<UserCouponEntity>) {
        super();
        Object.assign(this, partial);
    }
}
