import { NestFactory, Reflector } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ClassSerializerInterceptor, ValidationPipe } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { cors: true });

    const config = new DocumentBuilder().setTitle("API").setVersion("1.0").build();

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup("api", app, document);

    app.setGlobalPrefix("/api");

    app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));

    app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

    await app.listen(process.env.PORT ?? 8080);
}

bootstrap().catch((err) => {
    console.error(err);
});
