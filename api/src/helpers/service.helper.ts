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

    const name_file = `${new Date().getTime()}${file.originalname}`;

    const data = await bucket.storage.from(process.env.BUCKET_NAME).upload(name_file, file.buffer, {
        upsert: true
    });

    if (data.error) {
        throw new HttpException(data.error, HttpStatus.BAD_REQUEST);
    }

    if (data.data) {
        const new_file = await repository.save({
            fil_url: data.data.path,
            fil_name: name_file,
            fil_size: file.size,
            fil_mimetype: file.mimetype
        });

        return new_file.id;
    }

    return null;
};

const urlFile = async (path: string) => {
    const _10_YEARS = 365 * 24 * 60 * 60 * 1000;

    const bucket = createClient(process.env.BUCKET_URL, process.env.BUCKET_KEY, {
        auth: {
            persistSession: false
        }
    });

    const { data, error } = await bucket.storage.from(process.env.BUCKET_NAME).createSignedUrl(path, _10_YEARS);

    if (error) {
        throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }

    return data.signedUrl;
};

export const ServiceHelpers = {
    checkUnique,
    uploadFile,
    urlFile
};
