import { PHOTOS_REPOSITORY } from "src/repository/repository";
import { Photo } from "./entities/photo.entity";

export const photosProvider = [
    {
        provide: PHOTOS_REPOSITORY,
        useValue: Photo
    }
];
