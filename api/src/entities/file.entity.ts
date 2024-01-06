import { AfterLoad, BaseEntity, Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ServiceHelpers } from "src/helpers/service.helper";
import { AdminEntity } from "./admin.entity";
import { UserEntity } from "./user.entity";
import { ProductEntity } from "./product.entity";
import { ExtraEntity } from "./extra.entity";

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

    @OneToOne(() => AdminEntity, (admin) => admin.picture, {
        onDelete: "CASCADE"
    })
    admin: AdminEntity;

    @OneToOne(() => UserEntity, (user) => user.picture, {
        onDelete: "CASCADE"
    })
    user: UserEntity;

    @OneToOne(() => ProductEntity, (product) => product.image, {
        onDelete: "CASCADE"
    })
    product: ProductEntity;

    @OneToOne(() => ExtraEntity, (extra) => extra.image, {
        onDelete: "CASCADE"
    })
    extra: ExtraEntity;

    url: string;

    @AfterLoad()
    async getUrl() {
        this.url = await ServiceHelpers.urlFile(this.fil_url);
    }

    constructor(partial: Partial<FileEntity>) {
        super();
        Object.assign(this, partial);
    }
}
