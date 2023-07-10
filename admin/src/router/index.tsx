import { update } from "@/store/auth/auth.slice";
import { ROUTES, checkUserAuthenticated } from "@/utils/route";
import { useRouter } from "next/navigation";
import { useEffect, ReactNode } from "react";
import { useDispatch } from "react-redux";

export type Props = {
    children: ReactNode;
};

const ProtectedRoute = ({ children }: Props) => {
    const dispatch = useDispatch();
    const router = useRouter();

    const isUserAuthenticated = checkUserAuthenticated();

    useEffect(() => {
        const user_local = localStorage.getItem("user");
        const token_local = localStorage.getItem("token");

        if (isUserAuthenticated) {
            dispatch(update({ user: JSON.parse(user_local ?? ""), token: JSON.parse(token_local ?? "") }));
        }

        if (!isUserAuthenticated) {
            return router.push(ROUTES.public.login);
        }
    }, [router.push, isUserAuthenticated, dispatch]);

    return (
        <>
            {!isUserAuthenticated && null}
            {isUserAuthenticated && children}
        </>
    );
};

export default ProtectedRoute;
