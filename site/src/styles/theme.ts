"use client";

import { ChakraTheme, StyleFunctionProps, extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const customTheme: Partial<ChakraTheme> = {
    config: {
        initialColorMode: "system",
        useSystemColorMode: true
    },
    styles: {
        global: (props: StyleFunctionProps) => ({
            body: {
                backgroundColor: mode("gray.50", "gray.900")(props)
            }
        })
    }
};

export const themeDefault = extendTheme({ ...customTheme });
