"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import { themeDefault } from "../styles/theme";
import { AuthProvider } from "../context/auth";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { useEffect, useState } from "react";
import { Metadata } from "next";

config.autoAddCss = false;

export const metadata: Metadata = {
    title: "Delivery",
    description: "Delivery"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <html lang="pt-BR">
            <head></head>
            <body>
                {!loading && (
                    <CacheProvider>
                        <CSSReset />
                        <ChakraProvider theme={themeDefault}>
                            <AuthProvider>
                                <div className="body_container">{children}</div>
                            </AuthProvider>
                        </ChakraProvider>
                    </CacheProvider>
                )}
            </body>
        </html>
    );
}
