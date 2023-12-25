import { FaTrash, FaUpload } from "react-icons/fa6";
import CustomBox from "../custom-box";
import { useRef } from "react";
import { FormikErrors } from "formik";
import toast from "react-hot-toast";
import { FileType } from "@/types/entity/entity.type";
import { toastConfirm } from "@/utils/toast";

type Props<T> = {
    picture?: File;
    pictures?: File[];
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void | FormikErrors<T>>;
    errors: string;
    touched: boolean;
    multiple?: boolean;
    pictures_old?: Array<{ id: number; [key: string]: any; file?: FileType }> | [];
    pictures_delete?: number[];
};

const FileUpload = <T,>({
    picture,
    pictures = [],
    setFieldValue,
    errors,
    touched,
    multiple = false,
    pictures_old = [],
    pictures_delete = []
}: Props<T>) => {
    const refImage = useRef<HTMLInputElement>(null);

    const upload = (files: FileList | null) => {
        if (!files || files.length === 0) {
            return;
        }

        if (!multiple) {
            const file = files[0];

            setFieldValue("picture", file);
        } else {
            if (pictures && files.length + pictures.length + pictures_old.length > 5) {
                return toast.error("You can only upload up to 5 pictures");
            }

            const file_array = pictures ?? [];

            for (const element of files) {
                file_array.push(element);
            }

            setFieldValue("pictures", file_array);
        }
    };

    const remove = (index: number, id?: number | null) => {
        toastConfirm("Do you really want to remove?", () => {
            if (id) {
                setFieldValue("pictures_delete", [...pictures_delete, id]);
                setFieldValue(
                    "pictures_old",
                    pictures_old.filter((_, i) => i !== index)
                );
            } else {
                setFieldValue(
                    "pictures",
                    pictures.filter((_, i) => i !== index)
                );
            }
        });
    };

    return (
        <CustomBox text="Images">
            <div>
                <div className="flex items-center justify-center flex-col">
                    {picture && !multiple && (
                        <>
                            <a className="flex justify-center" href={URL.createObjectURL(picture)} target="_blank">
                                <img src={URL.createObjectURL(picture)} alt={picture.name} className="max-w-md h-full object-cover w-96 rounded-sm" />
                            </a>

                            <button
                                className="bg-red-600 text-white rounded px-3 py-2 w-96 max-w-md flex justify-center items-center gap-3"
                                type="button"
                                onClick={() => setFieldValue("picture", undefined)}
                            >
                                <FaTrash /> Remove
                            </button>
                        </>
                    )}

                    {pictures && multiple && (
                        <div className="flex flex-row items-end gap-4 flex-wrap justify-center mb-4">
                            {pictures_old.map((picture, key) => (
                                <div className="flex items-center justify-center flex-col" key={picture.id}>
                                    <a className="flex justify-center" href={picture?.file?.url ?? ""} target="_blank">
                                        <img
                                            src={picture?.file?.url ?? ""}
                                            alt={picture?.file?.fil_name}
                                            className="max-w-md h-full object-cover w-96 rounded-sm"
                                        />
                                    </a>

                                    <button
                                        className="bg-red-600 text-white rounded px-3 py-2 w-96 max-w-md flex justify-center items-center gap-3"
                                        type="button"
                                        onClick={() => remove(key, picture?.id)}
                                    >
                                        <FaTrash /> Remove
                                    </button>
                                </div>
                            ))}

                            {pictures.map((picture, key) => (
                                <div className="flex items-center justify-center flex-col" key={key}>
                                    <a className="flex justify-center" href={URL.createObjectURL(picture)} target="_blank">
                                        <img
                                            src={URL.createObjectURL(picture)}
                                            alt={picture.name}
                                            className="max-w-md h-full object-cover w-96 rounded-sm"
                                        />
                                    </a>

                                    <button
                                        className="bg-red-600 text-white rounded px-3 py-2 w-96 max-w-md flex justify-center items-center gap-3"
                                        type="button"
                                        onClick={() => remove(key)}
                                    >
                                        <FaTrash /> Remove
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <input ref={refImage} multiple={multiple} className="hidden" type="file" accept="image/*" onChange={(e) => upload(e.target.files)} />

                {!picture && (
                    <button
                        type="button"
                        className="flex justify-center items-center gap-3 rounded px-3 py-2 text-gray-100 font-semibold bg-blue-600 focus-visible:outline-blue-600 hover:bg-blue-500"
                        onClick={() => refImage.current?.click()}
                    >
                        <FaUpload /> Upload picture
                    </button>
                )}

                <p className="text-sm font-medium text-red-600">{errors && touched && errors}</p>
            </div>
        </CustomBox>
    );
};

export default FileUpload;
