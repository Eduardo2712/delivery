import { File } from "src/files/entities/file.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({
    name: "admins"
})
export class Admin {
    @PrimaryGeneratedColumn()
    id: number;

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
    password: string;

    @Column({
        nullable: false,
        default: false,
        type: "boolean"
    })
    adm_delete: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToOne(() => File, { cascade: true, eager: true })
    @JoinColumn({ name: "adm_id_picture" })
    picture: File;
}
