import { CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { FileEntity } from "./file.entity";
import { ProductEntity } from "./product.entity";

@Entity({
    name: "product_files"
})
export class ProductFileEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => FileEntity, (file) => file.files)
    @JoinColumn({ name: "prl_id_file" })
    file: FileEntity;

    @ManyToOne(() => ProductEntity, (product) => product.itens)
    @JoinColumn({ name: "prl_id_product" })
    product: ProductEntity;
}
