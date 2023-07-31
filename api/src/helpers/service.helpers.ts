import { Repository, FindOptionsWhere } from "typeorm";

export const checkUnique = async <T>(repository: Repository<T>, where: FindOptionsWhere<T>, field: string) => {
    const obj = await repository.findOne({
        where: where
    });

    return obj ? `The ${field} is already in use` : null;
};
