import { ReactNode } from "react";

type Props = {
    handleChange: (e: React.ChangeEvent<any>) => void;
    handleBlur: (e: React.FocusEvent<any, Element>) => void;
    name: string;
    title: string;
    errors: string | undefined;
    touched: boolean | undefined;
    value: string | number | undefined | null;
    is_required: boolean;
    children: ReactNode;
    emptyOption?: boolean;
    disabled?: boolean;
};

const StyleSelect = ({
    handleChange,
    handleBlur,
    name,
    title,
    errors,
    touched,
    value,
    is_required,
    children,
    emptyOption = false,
    disabled = false
}: Props) => {
    return (
        <>
            <label className="block text-sm font-semibold leading-6 text-gray-100" htmlFor={name}>
                {`${title}${is_required ? " *" : ""}`}
            </label>

            <select
                className="bg-slate-700 block w-full rounded-md border-0 py-2 px-2 text-gray-100 shadow-sm ring-1 ring-gray-800 placeholder:text-gray-400 focus:ring-blue-500 sm:text-sm sm:leading-6 h-10"
                id={name}
                name={name}
                onChange={handleChange}
                onBlur={handleBlur}
                value={value ?? ""}
                disabled={disabled}
            >
                {emptyOption && <option value={""}></option>}

                {children}
            </select>

            <p className="text-sm font-medium text-red-600">{errors && touched && errors}</p>
        </>
    );
};

export default StyleSelect;
