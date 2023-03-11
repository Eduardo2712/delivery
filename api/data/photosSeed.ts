import { faker } from "@faker-js/faker/locale/pt_BR";
import { Photo } from "@prisma/client";

const photosSeed = async () => {
    const data = [];

    for (let i = 0; i < 300; i++) {
        const photo: Omit<Photo, "created_at" | "updated_at" | "id"> = {
            pho_delete: false,
            pho_path: faker.image.imageUrl(),
            pho_name: faker.lorem.word(),
            pho_size: 2000
        };

        data.push(photo);
    }

    return data;
};

export default photosSeed;
