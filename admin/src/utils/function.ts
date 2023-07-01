import { ToastOptions, useToast } from "@chakra-ui/react";

export const typeUser = [
    {
        id: 1,
        type: "store",
        text: "Register your store"
    },
    {
        id: 2,
        type: "client",
        text: "Register as a client"
    }
];

export const firstCapital = (word: string) => {
    return `${word[0].toUpperCase()}${word.substring(1)}`;
};

export const toastParams: Pick<ToastOptions, "duration" | "position"> & { isClosable: boolean } = {
    duration: 4000,
    isClosable: true,
    position: "top-right"
};
