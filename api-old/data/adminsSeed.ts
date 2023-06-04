import { faker } from "@faker-js/faker/locale/pt_BR";
import * as bcrypt from "bcrypt";

const adminsSeed = async () => {
    const data = [];

    for (let i = 0; i < 100; i++) {
        const salt_rounds = bcrypt.genSaltSync(10);
        const text_password = "123456";
        const hash = bcrypt.hashSync(text_password, salt_rounds);

        const admin = {
            adm_id_photo: Math.floor(Math.random() * 300) + 1,
            adm_name: faker.name.fullName(),
            email: faker.internet.email(),
            adm_phone: faker.phone.number(),
            password: hash,
            adm_delete: false
        };

        data.push(admin);
    }

    return data;
};

export default adminsSeed;
