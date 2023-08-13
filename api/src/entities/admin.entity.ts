import { BeforeInsert, Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { FileEntity } from "./file.entity";
import { hashSync } from "bcrypt";
import { Exclude } from "class-transformer";

@Entity({
    name: "admins"
})
export class AdminEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: true,
        type: "int"
    })
    adm_id_picture: number;

    @Column({
        nullable: false,
        type: "varchar"
    })
    adm_name: string;

    @Column({
        nullable: false,
        type: "varchar"
    })
    email: string;

    @Column({
        nullable: false,
        type: "varchar"
    })
    adm_phone: string;

    @Column({
        nullable: false,
        type: "varchar"
    })
    @Exclude()
    password: string;

    @Column({
        nullable: false,
        default: true,
        type: "boolean"
    })
    adm_status: boolean;

    @Column({
        nullable: false,
        default: true,
        type: "boolean"
    })
    adm_active: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToOne(() => FileEntity, { cascade: true, eager: true })
    @JoinColumn({ name: "adm_id_picture" })
    picture: FileEntity;

    @BeforeInsert()
    hashPassword() {
        this.password = hashSync(this.password, 10);
    }
}
