"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import { themeDefault } from "../styles/theme";
import { AuthProvider } from "../context/auth";

export const metadata = {
    title: "Delivery",
    description: "Delivery"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="pt-BR">
            <head></head>
            <body>
                <CacheProvider>
                    <CSSReset />
                    <ChakraProvider theme={themeDefault}>
                        <AuthProvider>
                            <div className="body_container">{children}</div>
                        </AuthProvider>
                    </ChakraProvider>
                </CacheProvider>
            </body>
        </html>
    );
}
