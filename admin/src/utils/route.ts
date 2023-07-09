export const ROUTES = {
    private: {},
    public: {
        login: "/auth/login"
    }
};

export const checkUserAuthenticated = () => {
    const user = localStorage.getItem("user") ?? "";

    return !!user;
};

export const checkIsPublicRoute = (route: string) => {
    const publicRoutes = Object.values(ROUTES.public);

    return publicRoutes.includes(route);
};
