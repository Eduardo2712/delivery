"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import { themeDefault } from "../styles/theme";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { Metadata } from "next";
import { Provider } from "react-redux";
import { store } from "../store/store";
import ProtectedRoute from "@/router";
import { useEffect, useState } from "react";

config.autoAddCss = false;

export const metadata: Metadata = {
    title: "Delivery",
    description: "Delivery"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
    }, []);

    return (
        <html lang="pt-BR">
            <head></head>
            <body>
                {loading && (
                    <CacheProvider>
                        <CSSReset />
                        <ChakraProvider theme={themeDefault}>
                            <Provider store={store}>
                                <ProtectedRoute>
                                    <div className="body_container">{children}</div>
                                </ProtectedRoute>
                            </Provider>
                        </ChakraProvider>
                    </CacheProvider>
                )}
            </body>
        </html>
    );
}
