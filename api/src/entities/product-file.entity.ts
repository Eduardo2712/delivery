import { CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { File } from "./file.entity";
import { Product } from "./product.entity";

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
