"use client";

type Props = {
    handleChange: (e: React.ChangeEvent<any>) => void;
    handleBlur: (e: React.FocusEvent<any, Element>) => void;
    name: string;
    type?: string;
    title: string;
    errors: string | undefined;
    touched: boolean | undefined;
    value: string | number | undefined;
    is_required: boolean;
    max_length?: number;
};

const StyleInput = ({ handleChange, handleBlur, name, type = "text", title, errors, touched, value, is_required, max_length = undefined }: Props) => {
    return (
        <>
            <label className="block text-sm font-medium leading-6 text-gray-100" htmlFor={name}>
                {`${title}${is_required ? " *" : ""}`}
            </label>

            <input
                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                id={name}
                type={type}
                name={name}
                onChange={handleChange}
                onBlur={handleBlur}
                value={value}
                placeholder={title}
                maxLength={max_length}
            />

            <p className="text-sm text-red-600">{errors && touched && errors}</p>
        </>
    );
};

export default StyleInput;
