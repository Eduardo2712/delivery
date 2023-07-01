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

    @ManyToOne(() => Product)
    @JoinColumn({ name: "prf_id_product" })
    product: Product;

    @ManyToOne(() => File)
    @JoinColumn({ name: "prf_id_file" })
    file: File;
}
