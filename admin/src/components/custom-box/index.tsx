import { ReactNode } from "react";

type Props = {
    children: ReactNode;
};

const CustomBox = ({ children }: Props) => {
    return <div className="flex gap-4 flex-col bg-slate-800 rounded px-8 py-8 my-3">{children}</div>;
};

export default CustomBox;
