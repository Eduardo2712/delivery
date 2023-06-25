import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
    tableName: "products"
})
export class Product extends Model<Product> {
    @Column({
        allowNull: false,
        type: DataType.DECIMAL(10, 2)
    })
    pro_price: number;

    @Column({
        allowNull: false,
        type: DataType.STRING
    })
    pro_name: string;

    @Column({
        allowNull: false,
        type: DataType.STRING
    })
    pro_description: string;

    @Column({
        allowNull: false,
        type: DataType.BOOLEAN
    })
    pro_delete: boolean;

    @Column({
        allowNull: false,
        type: DataType.INTEGER
    })
    pro_id_type: number;
}
