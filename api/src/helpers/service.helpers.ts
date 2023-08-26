import { HttpException, HttpStatus } from "@nestjs/common";
import { createClient } from "@supabase/supabase-js";
import { FileEntity } from "src/entities/file.entity";
import { Repository, FindOptionsWhere } from "typeorm";

const checkUnique = async <T>(repository: Repository<T>, where: FindOptionsWhere<T>, field: string) => {
    const obj = await repository.findOne({
        where: where
    });

    return obj ? `The ${field} is already in use` : null;
};

const uploadFile = async (file: Express.Multer.File, repository: Repository<FileEntity>) => {
    const bucket = createClient(process.env.BUCKET_URL, process.env.BUCKET_KEY, {
        auth: {
            persistSession: false
        }
    });

    const data = await bucket.storage.from(process.env.BUCKET_NAME).upload(file.originalname, file.buffer, {
        upsert: true
    });

    if (data.error) {
        return new HttpException(data.error, HttpStatus.BAD_REQUEST);
    }

    const new_file = await repository.save({
        fil_url: data.data.path,
        fil_name: `${new Date().getTime()}${file.originalname}`,
        fil_size: file.size,
        fil_mimetype: file.mimetype
    });

    return new_file.id;
};

export const ServiceHelpers = {
    checkUnique,
    uploadFile
};
