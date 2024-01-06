import { FileTypeValidator, MaxFileSizeValidator, ParseFilePipe } from "@nestjs/common";
import { ConstHelper } from "./const.helper";

type FileConfigProps = {
    required?: boolean;
    type?: string;
};

const FileConfig = ({ required = false, type = "image/*" }: FileConfigProps) =>
    new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: ConstHelper.MAX_SIZE_FILE }), new FileTypeValidator({ fileType: type })],
        fileIsRequired: required
    });

export const ValidationHelpers = {
    FileConfig
};
