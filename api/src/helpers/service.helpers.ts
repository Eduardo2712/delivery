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
        return data.error;
    }

    await repository.save({
        fil_url: data.data.path
    });

    return data;
};

export const ServiceHelpers = {
    checkUnique,
    uploadFile
};
