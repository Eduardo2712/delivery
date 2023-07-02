import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import "dotenv/config";

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { cors: true });

    app.setGlobalPrefix("/api");

    app.useGlobalPipes(new ValidationPipe());

    await app.listen(process.env.PORT ?? 8080);
}

bootstrap().catch((err) => {
    console.error(err);
});
