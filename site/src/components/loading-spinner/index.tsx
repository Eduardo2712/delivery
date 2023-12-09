import { ReactNode } from "react";
import { FaSpinner } from "react-icons/fa6";

type Props = {
    loading: boolean;
    children?: ReactNode;
};

const LoadingSpinner = ({ loading = false, children = <></> }: Props) => {
    return (
        <>
            {loading ? (
                <div className="flex justify-center items-center mt-12">
                    <FaSpinner className="animate-spin text-gray-50" size={45} />
                </div>
            ) : (
                children
            )}
        </>
    );
};

export default LoadingSpinner;
