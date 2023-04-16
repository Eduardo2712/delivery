import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { ContextLogin, User } from "../types";
import { auth } from "../requests/auth.request";
import { useRouter } from "next/navigation";
import { toastAlert } from "@/utils/function";

const AuthContext = createContext<ContextLogin>({} as ContextLogin);

export const AuthProvider = ({ children }: any) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const router = useRouter();

    useEffect(() => {
        const user_recovery = localStorage.getItem("user");

        if (user_recovery) {
            setUser(JSON.parse(user_recovery));
        }

        setLoading(false);
    }, [children]);

    const login = async (email: string, password: string) => {
        try {
            const response = await auth({
                email,
                password
            });
            const response_json = await response.json();

            if (response.status !== 200) {
                return toastAlert({ title: "Error", description: response_json.message.join(", ") ?? "An error has occurred", status: "error" });
            }

            if (response_json.user && response_json.access_token) {
                localStorage.setItem(
                    "user",
                    JSON.stringify({
                        ...response_json.user,
                        token: response_json.access_token
                    })
                );
                setUser({ ...response_json.user, token: response_json.access_token });

                toastAlert({ title: "Success", description: "Login success", status: "success" });

                router.push("/");
            }
        } catch (error) {
            toastAlert({ title: "Error", description: "An error has occurred", status: "error" });
        }
    };

    const logout = () => {
        localStorage.removeItem("user");

        setUser(null);
    };

    const params = useMemo(() => ({ auth: Boolean(user), user, login, logout, loading }), [auth, user, login, logout, loading]);

    return <AuthContext.Provider value={params}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};
