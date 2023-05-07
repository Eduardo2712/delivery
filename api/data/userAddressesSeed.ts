import { faker } from "@faker-js/faker/locale/pt_BR";

const userAddressesSeed = async () => {
    const data = [];

    for (let i = 0; i < 300; i++) {
        const address = {
            usa_cep: faker.address.zipCode("#####-###"),
            usa_city: faker.address.cityName(),
            usa_complement: faker.address.streetAddress(),
            usa_street: faker.address.street(),
            usa_district: faker.address.secondaryAddress(),
            usa_number: faker.random.numeric().toString(),
            usa_state: faker.address.state(),
            usa_id_user: Math.floor(Math.random() * 100) + 1,
            usa_delete: false
        };

        data.push(address);
    }

    return data;
};

export default userAddressesSeed;
