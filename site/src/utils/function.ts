import { useToast } from "@chakra-ui/react";

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

type ToastType = {
    title: string;
    description: string;
    status: "info" | "warning" | "loading" | "success" | "error";
};

export const toastAlert = (props: ToastType) => {
    const toast = useToast();

    return toast({
        title: props.title,
        description: props.description,
        status: props.status,
        duration: 5000,
        isClosable: true,
        position: "top-right"
    });
};
