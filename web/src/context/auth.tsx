import { createContext, useContext, useEffect, useState } from "react";
import { ContextLogin, User } from "../types";
import { RoutesProps } from "react-router";
import { auth } from "../requests/user.request";

const AuthContext = createContext<ContextLogin>({} as ContextLogin);

export const AuthProvider = ({ children }: RoutesProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const userRecovery = localStorage.getItem("user");

        if (userRecovery) {
            setUser(JSON.parse(userRecovery));
        }

        setLoading(false);
    }, [children]);

    const login = async (email: string, password: string) => {
        try {
            const data: Pick<User, "email" | "password"> = {
                email,
                password
            };

            const response = await auth(data);

            if (!response.data.error) {
                setUser(response.data.user);

                localStorage.setItem(
                    "user",
                    JSON.stringify(response.data.user)
                );
            }

            return response.data;
        } catch (error) {
            console.error(`Error ${error}`);
        }
    };

    const logout = () => {
        localStorage.removeItem("user");

        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                auth: Boolean(user),
                user,
                login,
                logout,
                loading
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
