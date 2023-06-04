import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from "./users/users.module";
import { User } from "./users/entities/user.entity";

@Module({
    imports: [
        SequelizeModule.forRoot({
            dialect: "mysql",
            host: "localhost",
            port: 3306,
            username: "root",
            password: "root",
            database: "delivery",
            models: [User],
            autoLoadModels: true,
            synchronize: true
        }),
        UsersModule
    ],

    controllers: [AppController],

    providers: [AppService]
})
export class AppModule {}
