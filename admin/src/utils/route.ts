export const ROUTES = {
    private: {},
    public: {
        login: "/auth/login"
    }
};

export const checkUserAuthenticated = () => {
    const token = localStorage.getItem("token") ?? "";

    return !!token;
};

export const checkIsPublicRoute = (route: string) => {
    const publicRoutes = Object.values(ROUTES.public);

    return publicRoutes.includes(route);
};
