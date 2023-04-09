import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { ContextLogin, User } from "../types";
import { auth } from "../requests/auth.request";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

const AuthContext = createContext<ContextLogin>({} as ContextLogin);

export const AuthProvider = ({ children }: any) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const toast = useToast();
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
                return toast({
                    title: "Error",
                    description: response_json.message.join(", ") ?? "An error has occurred",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "top-right"
                });
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

                toast({
                    title: "Success",
                    description: "Login success",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "top-right"
                });

                router.push("/");
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "An error has occurred",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top-right"
            });
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
