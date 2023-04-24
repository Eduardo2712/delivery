import { Injectable } from "@nestjs/common";
import { ListProductDto } from "./dto/list-product.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ProductsService {
    constructor(private readonly prisma: PrismaService) {}

    async list(listProductDto: ListProductDto) {
        return "This action adds a new product";
    }
}
