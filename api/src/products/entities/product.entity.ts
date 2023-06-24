import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
    tableName: "products",
    defaultScope: {
        attributes: {
            exclude: ["createdAt", "updatedAt"]
        }
    },
    timestamps: false
})
export class Product extends Model<Product> {
    @Column({
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataType.INTEGER
    })
    id: number;

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

    @Column({
        defaultValue: DataType.NOW,
        allowNull: false,
        type: DataType.DATE
    })
    created_at: Date;

    @Column({
        defaultValue: DataType.NOW,
        allowNull: false,
        type: DataType.DATE
    })
    updated_at: Date;
}
