import { File } from "src/files/entities/file.entity";
import { Product } from "src/products/entities/product.entity";
import { CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({
    name: "product_files"
})
export class ProductFile {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => File, (file) => file.productFiles)
    @JoinColumn({ name: "prl_id_file" })
    file: File;

    @ManyToOne(() => Product, (product) => product.productFiles)
    @JoinColumn({ name: "prl_id_product" })
    product: Product;
}
