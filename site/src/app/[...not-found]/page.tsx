import { NextPage } from "next";
import { PiSmileyXEyesLight } from "react-icons/pi";

const Page: NextPage = () => {
    return (
        <div className="mx-auto flex flex-col items-center justify-center">
            <PiSmileyXEyesLight size={150} className="text-gray-50" />

            <p className="text-5xl font-semibold text-gray-50">404</p>

            <p className="text-2xl font-medium text-gray-50">Page not found</p>
        </div>
    );
};

export default Page;
