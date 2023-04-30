import { faker } from "@faker-js/faker/locale/pt_BR";
import { Product } from "@prisma/client";

const productsSeed = async () => {
    const data = [];

    for (let i = 0; i < 300; i++) {
        const address: Omit<Product, "created_at" | "updated_at" | "id"> = {
            pro_description: faker.lorem.sentence(),
            pro_name: faker.word.adjective(),
            pro_price: Number(faker.commerce.price()),
            pro_delete: false,
            pro_id_type: Math.floor(Math.random() * 6) + 1,
            pro_id_photo: Math.floor(Math.random() * 300) + 1
        };

        data.push(address);
    }

    return data;
};

export default productsSeed;
