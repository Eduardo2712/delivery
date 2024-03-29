import { get } from "@/store/auth/auth.slice";
import { ROUTES, checkIsPublicRoute, checkUserAuthenticated } from "@/utils/route";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, ReactNode } from "react";
import { useDispatch } from "react-redux";

export type Props = {
    children: ReactNode;
};

const ProtectedRoute = ({ children }: Props) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const path = usePathname();

    const is_user_authenticated = checkUserAuthenticated();

    const is_public_page = checkIsPublicRoute(path);

    useEffect(() => {
        if (is_user_authenticated) {
            dispatch(get());

            if (is_public_page) {
                return router.push("/");
            }
        } else {
            return router.push(ROUTES.public.login);
        }
    }, [router, is_user_authenticated, dispatch, is_public_page]);

    return (
        <>
            {!is_user_authenticated && null}
            {is_user_authenticated && !is_public_page && children}
        </>
    );
};

export default ProtectedRoute;
