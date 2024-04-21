import Link from "next/link";

type Props = {
    handleChange?: (e: React.ChangeEvent<any>) => void;
    handleBlur?: (e: React.FocusEvent<any, Element>) => void;
    name?: string;
    type?: string;
    title: string;
    errors?: string;
    touched?: boolean;
    value: string | number | readonly string[] | undefined;
    is_required?: boolean;
    max_length?: number;
    disabled?: boolean;
    readOnly?: boolean;
    multiple?: boolean;
    style_input?: React.CSSProperties;
    link?: string | null;
    className_input?: string | null;
};

const StyleInput = ({
    handleChange = () => {},
    handleBlur = () => {},
    name,
    type = "text",
    title = "",
    errors,
    touched,
    value,
    is_required = false,
    max_length = undefined,
    disabled = false,
    readOnly = false,
    multiple = false,
    style_input = {},
    link = null,
    className_input = null
}: Props) => {
    const component = (
        <div className="h-24">
            <label className="block text-sm font-semibold leading-6 text-gray-100" htmlFor={name}>
                {`${title}${is_required ? " *" : ""}`}
            </label>

            {multiple ? (
                <textarea
                    style={style_input}
                    className={`${className_input} bg-slate-700 block w-full rounded-md py-2 px-2 ${
                        link ? "text-blue-400 font-bold hover:text-blue-500" : "text-gray-100"
                    } shadow-sm ring-1 ring-gray-800 placeholder:text-gray-400 focus:ring-blue-500 sm:text-sm sm:leading-6 disabled:text-gray-300 resize-none h-16 ${
                        link ? "cursor-pointer" : ""
                    } ${touched && errors ? "border-red-500 border-2" : "border-0"}`}
                    id={name}
                    name={name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={value}
                    maxLength={max_length}
                    disabled={disabled}
                    readOnly={readOnly}
                ></textarea>
            ) : (
                <input
                    style={style_input}
                    className={`${className_input} bg-slate-700 block w-full rounded-md py-2 px-2 ${
                        link ? "text-blue-400 font-bold hover:text-blue-500" : "text-gray-100"
                    } shadow-sm ring-1 ring-gray-800 placeholder:text-gray-400 focus:ring-blue-500 sm:text-sm sm:leading-6 h-10 disabled:text-gray-300 ${
                        link ? "cursor-pointer" : ""
                    } ${touched && errors ? "border-red-500 border-2" : "border-0"}`}
                    id={name}
                    type={type}
                    name={name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={value}
                    maxLength={max_length}
                    disabled={disabled}
                    readOnly={readOnly}
                />
            )}

            <p className="text-sm font-medium text-red-600">{errors && touched && errors}</p>
        </div>
    );

    return <>{link ? <Link href={link}>{component}</Link> : component}</>;
};

export default StyleInput;
