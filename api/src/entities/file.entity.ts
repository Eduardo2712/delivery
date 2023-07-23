import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ProductFileEntity } from "./product-file.entity";

@Entity({
    name: "files"
})
export class FileEntity {
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

    @OneToMany(() => ProductFileEntity, (productFile) => productFile.file)
    @JoinColumn({ name: "prl_id_file" })
    files: ProductFileEntity[];
}
