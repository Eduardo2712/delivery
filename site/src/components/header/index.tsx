import { RootState } from "@/store/store";
import { UserStoreType } from "@/types/store/auth.type";
import { FaCircleUser } from "react-icons/fa6";
import { useSelector } from "react-redux";

const Header = () => {
    const user = useSelector<RootState, UserStoreType | null>((state) => state.auth.user);

    return (
        <header className="flex items-center justify-end h-14">
            <FaCircleUser size={30} className="text-white" />

            <p>Hello, {user?.use_name}</p>
        </header>
    );
};

export default Header;
