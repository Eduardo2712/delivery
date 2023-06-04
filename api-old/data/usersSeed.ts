import { faker } from "@faker-js/faker/locale/pt_BR";
import * as bcrypt from "bcrypt";

const usersSeed = async () => {
    const data = [];

    for (let i = 0; i < 100; i++) {
        const salt_rounds = bcrypt.genSaltSync(10);
        const text_password = "123456";
        const hash = bcrypt.hashSync(text_password, salt_rounds);

        const user = {
            use_id_photo: Math.floor(Math.random() * 300) + 1,
            use_name: faker.name.fullName(),
            email: faker.internet.email(),
            use_phone: faker.phone.number(),
            use_date_birth: faker.date.birthdate(),
            use_cpf: faker.address.zipCode(),
            password: hash,
            use_delete: false
        };

        data.push(user);
    }

    return data;
};

export default usersSeed;
