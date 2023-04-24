import { setUser } from "@/store/auth/auth.slice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export type Props = {
    children: any;
};

const ProtectedRoute = (props: Props) => {
    const PRIVATE_ROUTES = ["/"];
    const LOGIN_ROUTES = ["/auth/login", "/auth/register"];

    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        const user_local = localStorage.getItem("user");

        if (user_local) {
            dispatch(setUser({ user: JSON.parse(user_local ?? "") }));
        }

        if (
            (localStorage.getItem("user") && LOGIN_ROUTES.includes(window.location.pathname)) ||
            (!localStorage.getItem("user") && PRIVATE_ROUTES.includes(window.location.pathname))
        ) {
            router.push("/");
        }
    }, []);

    return props.children;
};

export default ProtectedRoute;
