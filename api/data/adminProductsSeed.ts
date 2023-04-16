import { faker } from "@faker-js/faker/locale/pt_BR";
import { AdminProduct } from "@prisma/client";

const adminProductsSeed = async () => {
    const data = [];

    for (let i = 0; i < 300; i++) {
        const address: Omit<AdminProduct, "created_at" | "updated_at" | "id"> = {
            adp_description: faker.lorem.sentence(),
            adp_id_admin: Math.floor(Math.random() * 300) + 1,
            adp_name: faker.word.adjective(),
            adp_price: Number(faker.commerce.price()),
            adp_delete: false
        };

        data.push(address);
    }

    return data;
};

export default adminProductsSeed;
