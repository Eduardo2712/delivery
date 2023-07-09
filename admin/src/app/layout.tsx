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

export const metadata = {
    title: "Admin",
    description: "Admin"
};

export default function RootLayout({ children }: { children: ReactNode }) {
    const path = usePathname();
    const isPublicPage = checkIsPublicRoute(path);

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
                        {isPublicPage && (
                            <>
                                <Toaster />
                                {children}
                            </>
                        )}

                        {!isPublicPage && (
                            <ProtectedRoute>
                                <Toaster />
                                {children}
                            </ProtectedRoute>
                        )}
                    </Provider>
                )}
            </body>
        </html>
    );
}
