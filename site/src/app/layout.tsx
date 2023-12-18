"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import { Provider } from "react-redux";
import { store } from "../store/store";
import ProtectedRoute from "@/router";
import { ReactNode, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { usePathname } from "next/navigation";
import { checkIsPublicRoute } from "@/utils/route";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
    const path = usePathname();
    const is_public_page = checkIsPublicRoute(path);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
    }, []);

    return (
        <html lang="pt-BR">
            <head></head>

            <body className={inter.className}>
                {loading && (
                    <Provider store={store}>
                        {is_public_page && (
                            <>
                                <Toaster
                                    toastOptions={{
                                        style: {
                                            background: "#012",
                                            color: "#fff"
                                        }
                                    }}
                                />
                                {children}
                            </>
                        )}

                        {!is_public_page && (
                            <ProtectedRoute>
                                <Toaster
                                    toastOptions={{
                                        style: {
                                            background: "#012",
                                            color: "#fff"
                                        }
                                    }}
                                />

                                {children}
                            </ProtectedRoute>
                        )}
                    </Provider>
                )}
            </body>
        </html>
    );
}
