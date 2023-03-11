import { Router } from "next/router";
import { useAuth } from "../context/auth";

export type Props = {
    router: Router;
    children: any;
};

const ProtectedRoute = (props: Props) => {
    const { auth } = useAuth();
    const PUBLIC_ROUTES = ["/login", "/register"];

    // if (
    //     !auth &&
    //     !PUBLIC_ROUTES.includes(props.router.pathname) &&
    //     !localStorage.getItem("user")
    // ) {
    //     props.router.push("/login");
    // } else if (
    //     auth &&
    //     props.router.pathname === "/login" &&
    //     localStorage.getItem("user")
    // ) {
    //     props.router.push("/feed");
    // } else {
    //     return props.children;
    // }
    return props.children;
};

export default ProtectedRoute;
