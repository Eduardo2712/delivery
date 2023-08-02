import { ReactNode } from "react";

const CustomBox = (children: ReactNode) => {
    return <div className="flex gap-4 flex-col bg-slate-800 rounded px-8 py-8">{children}</div>;
};

export default CustomBox;
