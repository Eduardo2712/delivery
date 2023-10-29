import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ProductFileEntity } from "./product-file.entity";
import { ServiceHelpers } from "src/helpers/service.helper";
import { AdminEntity } from "./admin.entity";
import { UserEntity } from "./user.entity";

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

    @OneToMany(() => ProductFileEntity, (productFile) => productFile.file, {
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "prl_id_file" })
    files: ProductFileEntity[];

    @OneToOne(() => AdminEntity, (admin) => admin.picture, {
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "adm_id_picture" })
    admin: AdminEntity;

    @OneToOne(() => UserEntity, (user) => user.picture, {
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "use_id_picture" })
    user: UserEntity;

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
