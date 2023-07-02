import { setUser } from "@/store/auth/auth.slice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export type Props = {
    children: any;
};

const ProtectedRoute = ({ children }: Props) => {
    const PRIVATE_ROUTES = ["/"];
    const LOGIN_ROUTES = ["/auth/login", "/auth/register"];

    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        const user_local = localStorage.getItem("user");

        if (user_local) {
            dispatch(setUser({ user: JSON.parse(user_local ?? "") }));
        }

        if (!user_local && PRIVATE_ROUTES.includes(window.location.pathname)) {
            return router.push("/auth/login");
        }
    }, []);

    return children;
};

export default ProtectedRoute;
