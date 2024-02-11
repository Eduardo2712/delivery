import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    JoinColumn,
    ManyToOne,
    OneToOne,
    BaseEntity,
    BeforeUpdate,
    UpdateEvent
} from "typeorm";
import { ItemEntity } from "./item.entity";
import { ProductHistoryEntity } from "./product-history.entity";
import { CategoryEntity } from "./category.entity";
import { ProductRatingEntity } from "./product-rating.entity";
import { FileEntity } from "./file.entity";
import { ProductExtraEntity } from "./product-extra.entity";

@Entity({
    name: "products"
})
export class ProductEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false,
        type: "unsigned big int"
    })
    pro_id_category: number;

    @Column({
        nullable: true,
        type: "unsigned big int"
    })
    pro_id_image: number;

    @Column({
        nullable: false,
        type: "varchar"
    })
    pro_name: string;

    @Column({
        nullable: false,
        type: "text"
    })
    pro_ingredients: string;

    @Column({
        nullable: false,
        type: "int",
        default: 1
    })
    pro_number_people: number;

    @Column({
        nullable: false,
        type: "decimal",
        precision: 10,
        scale: 2
    })
    pro_price: number;

    @Column({
        nullable: false,
        type: "boolean",
        default: true
    })
    pro_status: boolean;

    @Column({
        nullable: false,
        default: true,
        type: "boolean"
    })
    pro_active: boolean;

    avg_rating: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToMany(() => ItemEntity, (item) => item.product, {
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "ite_id_product" })
    items: ItemEntity[];

    @OneToMany(() => ProductHistoryEntity, (product_history) => product_history.product, {
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "prh_id_product" })
    histories: ProductHistoryEntity[];

    @ManyToOne(() => CategoryEntity, (category) => category.products, { onDelete: "CASCADE" })
    @JoinColumn({ name: "pro_id_category" })
    category: CategoryEntity;

    @OneToMany(() => ProductRatingEntity, (rating) => rating.product, { onDelete: "CASCADE" })
    @JoinColumn({ name: "prr_id_product" })
    ratings: ProductRatingEntity[];

    @OneToOne(() => FileEntity, (image) => image.product, { onDelete: "CASCADE" })
    @JoinColumn({ name: "pro_id_image" })
    image: FileEntity;

    @OneToMany(() => ProductExtraEntity, (product) => product.extra, { onDelete: "CASCADE" })
    @JoinColumn({ name: "pre_id_product" })
    extras: ProductExtraEntity[];

    @BeforeUpdate()
    async beforeUpdate(event: UpdateEvent<ProductEntity>) {
        console.log(event);
        event.updatedColumns.forEach((column) => {
            const old_value = event.databaseEntity[column.propertyName];
            const new_value = event.entity[column.propertyName];

            if (old_value !== new_value && column.propertyName === "pro_price") {
                const product_history = new ProductHistoryEntity({});

                product_history.prh_id_product = event.entity.id;
                product_history.prh_id_admin = 1;
                product_history.prh_price = new_value;
                product_history.prh_date = new Date();

                product_history.save();
            }
        });
    }

    constructor(partial: Partial<ProductEntity>) {
        super();
        Object.assign(this, partial);
    }
}
