import { USERS_REPOSITORY } from "src/repository/repository";
import { User } from "./entities/user.entity";

export const usersProviders = [
    {
        provide: USERS_REPOSITORY,
        useValue: User
    }
];
