import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { usersProvider } from "./users.provider";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./entities/user.entity";

@Module({
    imports: [SequelizeModule.forFeature([User])],
    controllers: [UsersController],
    providers: [UsersService, ...usersProvider],
    exports: [UsersService]
})
export class UsersModule {}
