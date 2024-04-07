export const ROUTES = {
    public: {
        index: "/",
        login: "/auth/login",
        register: "/auth/register"
    }
};

export const checkUserAuthenticated = () => {
    const token = localStorage.getItem("token");
    const refresh_token = localStorage.getItem("refresh_token");

    return !!token && !!refresh_token;
};

export const checkIsPublicRoute = (route: string) => {
    const public_routes = Object.values(ROUTES.public);

    return public_routes.includes(route);
};
