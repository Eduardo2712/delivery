import { FaSpinner } from "react-icons/fa6";

const LoadingSpinner = () => {
    return (
        <div className="flex justify-center items-center mt-12">
            <FaSpinner className="animate-spin text-gray-50" size={45} />
        </div>
    );
};

export default LoadingSpinner;
