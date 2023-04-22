"use client";

import { useEffect, useState } from "react";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider, CSSReset, Spinner } from "@chakra-ui/react";
import { themeDefault } from "../styles/theme";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { Metadata } from "next";
import { Provider } from "react-redux";
import { store } from "../store/store";

config.autoAddCss = false;

export const metadata: Metadata = {
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
                        <Provider store={store}>
                            <div className="body_container">{children}</div>
                        </Provider>
                    </ChakraProvider>
                </CacheProvider>
            </body>
        </html>
    );
}
