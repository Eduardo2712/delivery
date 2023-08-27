import { FaTrash, FaUpload } from "react-icons/fa6";
import CustomBox from "../custom-box";
import { useRef } from "react";
import { FormikErrors } from "formik";

type Props<T> = {
    picture: File | undefined;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void | FormikErrors<T>>;
    errors?: string;
    touched?: boolean;
};

const FileUpload = <T extends any>({ picture, setFieldValue, errors, touched }: Props<T>) => {
    const refImage = useRef<HTMLInputElement>(null);

    const upload = (
        files: FileList | null,
        setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void | FormikErrors<T>>
    ) => {
        if (!files || files.length === 0) {
            return;
        }

        const file = files[0];

        setFieldValue("picture", file);
    };

    return (
        <CustomBox>
            <div>
                <div className="flex items-center justify-center flex-col">
                    {picture && (
                        <>
                            <a className="flex justify-center" href={URL.createObjectURL(picture)} target="_blank">
                                <img src={URL.createObjectURL(picture)} alt={picture.name} className="max-w-md h-full object-cover w-full" />
                            </a>

                            <button
                                className="bg-red-600 text-white rounded px-3 py-2 w-full max-w-md flex justify-center items-center gap-3"
                                type="button"
                                onClick={() => setFieldValue("picture", undefined)}
                            >
                                <FaTrash /> Remove
                            </button>
                        </>
                    )}
                </div>

                <input ref={refImage} className="hidden" type="file" accept="image/*" onChange={(e) => upload(e.target.files, setFieldValue)} />

                {!picture && (
                    <button
                        type="button"
                        className="flex justify-center items-center gap-3 rounded px-3 py-2 text-gray-100 font-semibold bg-blue-600"
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
