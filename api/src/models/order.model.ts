import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "./user.model";

@Table({
    tableName: "orders"
})
export class Order extends Model<Order> {
    @ForeignKey(() => User)
    @Column({
        allowNull: false,
        type: DataType.INTEGER
    })
    ord_id_user: number;

    @Column({
        allowNull: false,
        type: DataType.DECIMAL(10, 2)
    })
    ord_delivery_fee: number;

    @Column({
        allowNull: false,
        type: DataType.STRING
    })
    ord_cep: string;

    @Column({
        allowNull: false,
        type: DataType.STRING
    })
    ord_street: string;

    @Column({
        allowNull: false,
        type: DataType.STRING
    })
    ord_number: string;

    @Column({
        allowNull: false,
        type: DataType.STRING
    })
    ord_neighborhood: string;

    @Column({
        allowNull: false,
        type: DataType.STRING
    })
    ord_city: string;

    @Column({
        allowNull: false,
        type: DataType.STRING
    })
    ord_state: string;

    @Column({
        allowNull: true,
        type: DataType.STRING
    })
    ord_complement: string;

    @Column({
        allowNull: false,
        type: DataType.BOOLEAN
    })
    ord_delivered: boolean;

    @Column({
        allowNull: false,
        type: DataType.BOOLEAN
    })
    ord_confirmed_payment: boolean;

    @Column({
        allowNull: false,
        type: DataType.BOOLEAN
    })
    ord_delivery: boolean;

    @Column({
        allowNull: false,
        defaultValue: false,
        type: DataType.BOOLEAN
    })
    ord_delete: boolean;

    @BelongsTo(() => User)
    user: User;
}
