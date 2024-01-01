import { FaTrash, FaUpload } from "react-icons/fa6";
import CustomBox from "../custom-box";
import { useRef } from "react";
import { FormikErrors } from "formik";
import { toastConfirm } from "@/utils/toast";

type Props<T> = {
    picture?: File;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void | FormikErrors<T>>;
    errors: string;
    touched: boolean;
};

const FileUpload = <T,>({ picture, setFieldValue, errors, touched }: Props<T>) => {
    const refImage = useRef<HTMLInputElement>(null);

    const upload = (files: FileList | null) => {
        if (!files || files.length === 0) {
            return;
        }

        const file = files[0];

        setFieldValue("picture", file);
    };

    const remove = () => {
        toastConfirm("Do you really want to remove?", () => {
            setFieldValue("picture", undefined);
        });
    };

    return (
        <CustomBox text="Images">
            <div>
                <div className="flex items-center justify-center flex-col">
                    {picture && (
                        <>
                            <a className="flex justify-center" href={URL.createObjectURL(picture)} target="_blank">
                                <img src={URL.createObjectURL(picture)} alt={picture.name} className="max-w-md h-full object-cover w-96 rounded-sm" />
                            </a>

                            <button
                                className="bg-red-600 text-white rounded px-3 py-2 w-96 max-w-md flex justify-center items-center gap-3"
                                type="button"
                                onClick={() => remove()}
                            >
                                <FaTrash /> Remove
                            </button>
                        </>
                    )}
                </div>

                <input ref={refImage} className="hidden" type="file" accept="image/*" onChange={(e) => upload(e.target.files)} />

                {!picture && (
                    <button
                        type="button"
                        className="flex justify-center items-center gap-3 rounded px-3 py-2 text-gray-100 font-semibold bg-blue-600 focus-visible:outline-blue-600 hover:bg-blue-500"
                        onClick={() => refImage.current?.click()}
                    >
                        <FaUpload /> Upload picture
                    </button>
                )}

                <p className="text-sm font-medium text-red-600 mt-2">{errors && touched && errors}</p>
            </div>
        </CustomBox>
    );
};

export default FileUpload;
