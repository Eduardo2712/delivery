import { FaTrash, FaUpload } from "react-icons/fa6";
import CustomBox from "../custom-box";
import { useRef } from "react";
import { FormikErrors } from "formik";
import toast from "react-hot-toast";

type Props<T> = {
    picture?: File;
    pictures?: File[];
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void | FormikErrors<T>>;
    errors?: string;
    touched?: boolean;
    multiple?: boolean;
};

const FileUpload = <T,>({ picture, pictures, setFieldValue, errors, touched, multiple = false }: Props<T>) => {
    const refImage = useRef<HTMLInputElement>(null);

    const upload = (
        files: FileList | null,
        setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void | FormikErrors<T>>
    ) => {
        if (!files || files.length === 0) {
            return;
        }

        if (!multiple) {
            const file = files[0];

            setFieldValue("picture", file);
        } else {
            if (pictures && files.length + pictures.length > 5) {
                return toast.error("You can only upload up to 5 pictures");
            }

            const file_array = pictures ?? [];

            for (let i = 0; i < files.length; i++) {
                file_array.push(files[i]);
            }

            setFieldValue("pictures", file_array);
        }
    };

    return (
        <CustomBox>
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

                    {pictures && pictures?.length > 0 && (
                        <div className="flex flex-row items-end gap-4 flex-wrap justify-center mb-4">
                            {pictures.map((picture, index) => (
                                <div className="flex items-center justify-center flex-col" key={index}>
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
                                        onClick={() =>
                                            setFieldValue(
                                                "pictures",
                                                pictures.filter((_, i) => i !== index)
                                            )
                                        }
                                    >
                                        <FaTrash /> Remove
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <input
                    ref={refImage}
                    multiple={multiple}
                    className="hidden"
                    type="file"
                    accept="image/*"
                    onChange={(e) => upload(e.target.files, setFieldValue)}
                />

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
