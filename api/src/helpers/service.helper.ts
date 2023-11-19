import { HttpException, HttpStatus } from "@nestjs/common";
import { createClient } from "@supabase/supabase-js";
import { FileEntity } from "src/entities/file.entity";
import { Repository, FindOptionsWhere } from "typeorm";

const checkUnique = async <T>(repository: Repository<T>, where: FindOptionsWhere<T>, field: string): Promise<string | null> => {
    const obj = await repository.findOne({
        where: where
    });

    return obj ? `The ${field} is already in use` : null;
};

const uploadFile = async (file: Express.Multer.File, repository: Repository<FileEntity>): Promise<number | null> => {
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

const urlFile = async (path: string): Promise<string> => {
    const _1_YEAR = 60 * 60 * 24 * 365 * 1000;

    const bucket = createClient(process.env.BUCKET_URL, process.env.BUCKET_KEY, {
        auth: {
            persistSession: false
        }
    });

    const { data, error } = await bucket.storage.from(process.env.BUCKET_NAME).createSignedUrl(path, _1_YEAR);

    if (error) {
        throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }

    return data.signedUrl;
};

const removeFile = async (file_name: string): Promise<boolean> => {
    const bucket = createClient(process.env.BUCKET_URL, process.env.BUCKET_KEY, {
        auth: {
            persistSession: false
        }
    });

    const { error } = await bucket.storage.from(process.env.BUCKET_NAME).remove([file_name]);

    if (error) {
        throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }

    return true;
};

export const ServiceHelpers = {
    checkUnique,
    uploadFile,
    urlFile,
    removeFile
};
