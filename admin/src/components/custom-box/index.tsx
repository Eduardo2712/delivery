import { ReactNode } from "react";

type Props = {
    children: ReactNode;
    loading?: boolean;
    text?: string;
};

const CustomBox = ({ children, loading = false, text }: Props) => {
    return (
        <div className={`flex gap-4 flex-col bg-slate-800 rounded px-8 py-8 my-3 ${loading ? "animate-pulse" : ""}`}>
            {text && <p className="text-xl font-semibold text-gray-50 mb-4">{text}</p>}

            {children}
        </div>
    );
};

export default CustomBox;
