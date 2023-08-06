type Props = {
    handleChange: (e: React.ChangeEvent<any>) => void;
    handleBlur: (e: React.FocusEvent<any, Element>) => void;
    name: string;
    type?: string;
    title: string;
    errors: string | undefined;
    touched: boolean | undefined;
    value: string | number | undefined;
    is_required?: boolean;
    max_length?: number;
    disabled?: boolean;
};

const StyleInput = ({
    handleChange,
    handleBlur,
    name,
    type = "text",
    title,
    errors,
    touched,
    value,
    is_required = false,
    max_length = undefined,
    disabled = false
}: Props) => {
    return (
        <>
            <label className="block text-sm font-semibold leading-6 text-gray-100" htmlFor={name}>
                {`${title}${is_required ? " *" : ""}`}
            </label>

            <input
                className="bg-slate-700 block w-full rounded-md border-0 py-2 px-2 text-gray-100 shadow-sm ring-1 ring-gray-800 placeholder:text-gray-400 focus:ring-blue-500 sm:text-sm sm:leading-6 h-10 disabled:text-gray-400"
                id={name}
                type={type}
                name={name}
                onChange={handleChange}
                onBlur={handleBlur}
                value={value}
                maxLength={max_length}
                disabled={disabled}
            />

            <p className="text-sm font-medium text-red-600">{errors && touched && errors}</p>
        </>
    );
};

export default StyleInput;
