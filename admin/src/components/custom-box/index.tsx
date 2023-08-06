import { ReactNode } from "react";

type Props = {
    children: ReactNode;
    loading?: boolean;
};

const CustomBox = ({ children, loading = false }: Props) => {
    return <div className={`flex gap-4 flex-col bg-slate-800 rounded px-8 py-8 my-3 ${loading ? "animate-pulse" : ""}`}>{children}</div>;
};

export default CustomBox;
