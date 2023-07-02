import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ProductFile } from "./product-file.entity";

@Entity({
    name: "files"
})
export class File {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false,
        type: "varchar"
    })
    fil_url: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToMany(() => ProductFile, (productFile) => productFile.file)
    @JoinColumn({ name: "prl_id_file" })
    productFiles: ProductFile[];
}
