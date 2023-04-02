import { Router } from "next/router";
import { useAuth } from "../context/auth";

export type Props = {
    router: Router;
    children: any;
};

const ProtectedRoute = (props: Props) => {
    const { auth } = useAuth();
    const PRIVATE_ROUTES = ["/order"];

    if (!auth && PRIVATE_ROUTES.includes(props.router.pathname) && !localStorage.getItem("user")) {
        props.router.push("/");
    } else {
        return props.children;
    }
};

export default ProtectedRoute;
