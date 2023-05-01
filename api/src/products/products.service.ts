import { Injectable } from "@nestjs/common";
import { ListProductDto } from "./dto/list-product.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ProductsService {
    constructor(private readonly prisma: PrismaService) {}

    async list(listProductDto: ListProductDto) {
        const products = await this.prisma.product.findMany({
            where: {
                pro_delete: false,
                pro_id_type: {
                    in: listProductDto.id_type
                }
            },
            include: {
                photo: true
            }
        });

        return products;
    }
}
