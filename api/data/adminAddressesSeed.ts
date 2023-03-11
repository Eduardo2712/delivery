import { faker } from "@faker-js/faker/locale/pt_BR";
import { AdminAddress } from "@prisma/client";

const adminAddressesSeed = async () => {
    const data = [];

    for (let i = 0; i < 300; i++) {
        const address: Omit<AdminAddress, "created_at" | "updated_at" | "id"> =
            {
                ada_cep: faker.address.zipCode("#####-###"),
                ada_city: faker.address.cityName(),
                ada_complement: faker.address.streetAddress(),
                ada_street: faker.address.street(),
                ada_district: faker.address.secondaryAddress(),
                ada_number: faker.random.numeric().toString(),
                ada_state: faker.address.state(),
                ada_id_admin: Math.floor(Math.random() * 100) + 1,
                ada_delete: false
            };

        data.push(address);
    }

    return data;
};

export default adminAddressesSeed;
