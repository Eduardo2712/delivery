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
        allowNull: false
    })
    pro_name: string;

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
