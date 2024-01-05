import {
    Body,
    Controller,
    Delete,
    FileTypeValidator,
    Get,
    HttpCode,
    HttpStatus,
    MaxFileSizeValidator,
    Param,
    ParseFilePipe,
    Post,
    Query,
    UploadedFile,
    UseInterceptors
} from "@nestjs/common";
import { ExtraService } from "./extra.service";
import { ExtraEntity } from "src/entities/extra.entity";
import { DatatableExtraDto } from "./dto/datatable-extra.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { ConstHelper } from "src/helpers/const.helper";
import { UpdateExtraDto } from "./dto/update-extra.dto";
import { CreateExtraDto } from "./dto/create-extra.dto";

const FileConfig = new ParseFilePipe({
    validators: [new MaxFileSizeValidator({ maxSize: ConstHelper.MAX_SIZE_FILE }), new FileTypeValidator({ fileType: "image/*" })],
    fileIsRequired: false
});

@Controller()
export class ExtraController {
    constructor(private readonly extraService: ExtraService) {}

    @Post(":id")
    @HttpCode(HttpStatus.OK)
    @UseInterceptors(FileInterceptor("picture"))
    async update(
        @Param("id") id: number,
        @Body() updateExtraDto: UpdateExtraDto,
        @UploadedFile(FileConfig) picture?: Express.Multer.File
    ): Promise<string | null> {
        return await this.extraService.update(id, updateExtraDto, picture);
    }

    @Post("/")
    @HttpCode(HttpStatus.CREATED)
    @UseInterceptors(FileInterceptor("picture"))
    async create(
        @Body() createExtraDto: CreateExtraDto,
        @UploadedFile(FileConfig)
        picture: Express.Multer.File
    ): Promise<string | void> {
        return await this.extraService.create(createExtraDto, picture);
    }

    @Get("/datatable")
    @HttpCode(HttpStatus.OK)
    async findAll(@Query() datatableExtraDto: DatatableExtraDto): Promise<ExtraEntity[]> {
        return await this.extraService.findAll(datatableExtraDto);
    }

    @Get(":id")
    @HttpCode(HttpStatus.OK)
    async findOne(@Param("id") id: number): Promise<ExtraEntity> {
        return await this.extraService.findOne(id);
    }

    @Delete(":id")
    @HttpCode(HttpStatus.OK)
    async remove(@Param("id") id: number): Promise<string | null> {
        return await this.extraService.remove(id);
    }
}
