import { RootState } from "@/store/store";
import { UserStoreType } from "@/types/store/auth.type";
import Link from "next/link";
import { FaCartPlus, FaCircleUser } from "react-icons/fa6";
import { useSelector } from "react-redux";

const Header = () => {
    const user = useSelector<RootState, UserStoreType | null>((state) => state.auth.user);

    return (
        <header className="flex items-center justify-between h-20 p-5">
            <Link href="/" className="text-white text-3xl font-bold italic">
                Delivery
            </Link>

            <div className="flex items-center justify-end gap-6">
                <div className="flex items-center gap-3">
                    <FaCircleUser size={30} className="text-white" />

                    {user ? (
                        <p className="text-white text-sm">Hello, {user?.use_name}</p>
                    ) : (
                        <div className="text-white text-sm">
                            <Link className="text-white font-bold" href={`/auth/login`}>
                                Login
                            </Link>
                            {" or "}
                            <Link className="text-white font-bold" href={`/auth/register`}>
                                Register
                            </Link>
                        </div>
                    )}
                </div>

                <div className="flex justify-end items-center cursor-pointer">
                    <div className="rounded-full bg-red-600 absolute top-3 p-0.5">
                        <p className="text-white text-xs">10</p>
                    </div>

                    <FaCartPlus size={33} className="text-white" />
                </div>
            </div>
        </header>
    );
};

export default Header;
