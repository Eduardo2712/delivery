export const ROUTES = {
    public: {
        index: "/",
        login: "/auth/login"
    }
};

export const checkUserAuthenticated = () => {
    const token = localStorage.getItem("token");

    return !!token;
};

export const checkIsPublicRoute = (route: string) => {
    const public_routes = Object.values(ROUTES.public);

    return public_routes.includes(route);
};
