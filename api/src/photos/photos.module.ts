import { Module } from "@nestjs/common";
import { PhotosService } from "./photos.service";
import { PhotosController } from "./photos.controller";
import { DatabaseModule } from "src/database/database.module";
import { photosProvider } from "./photos.provider";

@Module({
    imports: [DatabaseModule],
    controllers: [PhotosController],
    providers: [PhotosService, ...photosProvider],
    exports: [PhotosService]
})
export class PhotosModule {}
