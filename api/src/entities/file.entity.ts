import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ProductFileEntity } from "./product-file.entity";
import { ServiceHelpers } from "src/helpers/service.helper";

@Entity({
    name: "files"
})
export class FileEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false,
        type: "text"
    })
    fil_url: string;

    @Column({
        nullable: false,
        type: "varchar"
    })
    fil_name: string;

    @Column({
        nullable: false,
        type: "integer"
    })
    fil_size: number;

    @Column({
        nullable: false,
        type: "varchar"
    })
    fil_mimetype: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToMany(() => ProductFileEntity, (productFile) => productFile.file)
    @JoinColumn({ name: "prl_id_file" })
    files: ProductFileEntity[];

    get fileUrl(): Promise<string> {
        return this.getUrl();
    }

    private async getUrl(): Promise<string> {
        try {
            return await ServiceHelpers.urlFile(this.fil_url);
        } catch (error) {
            return "";
        }
    }
}
