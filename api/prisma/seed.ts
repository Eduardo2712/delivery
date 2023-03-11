import { PrismaClient } from "@prisma/client";
import userAddressesSeed from "../data/userAddressesSeed";
import photosSeed from "../data/photosSeed";
import usersSeed from "../data/usersSeed";
import adminsSeed from "../data/adminsSeed";
import adminAddressesSeed from "../data/adminAddressesSeed";

const prisma = new PrismaClient();

const main = async () => {
    await prisma.user.createMany({
        data: await usersSeed()
    });

    await prisma.admin.createMany({
        data: await adminsSeed()
    });

    await prisma.userAddress.createMany({
        data: await userAddressesSeed()
    });

    await prisma.adminAddress.createMany({
        data: await adminAddressesSeed()
    });

    await prisma.photo.createMany({
        data: await photosSeed()
    });
};

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(() => {
        prisma.$disconnect();
    });
