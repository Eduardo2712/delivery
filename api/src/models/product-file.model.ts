// @Table({
//     tableName: "product_files"
// })
// export class ProductFile extends Model<ProductFile> {
//     @ForeignKey(() => File)
//     @Column({
//         allowNull: true,
//         type: DataType.INTEGER
//     })
//     prf_id_file: number;

//     @ForeignKey(() => Product)
//     @Column({
//         allowNull: true,
//         type: DataType.INTEGER
//     })
//     prf_id_product: number;
// }
