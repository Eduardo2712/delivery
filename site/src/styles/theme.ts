import { ChakraTheme, extendTheme } from "@chakra-ui/react";

const customTheme: Partial<ChakraTheme> = {
    config: {
        initialColorMode: "system"
    }
};

export const themeDefault = extendTheme({ customTheme });
