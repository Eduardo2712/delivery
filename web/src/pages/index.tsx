import { useAuth } from "../context/auth";
import { Box, Container, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";

const BlockHighlights = () => {
    return (
        <Flex justifyContent={"space-between"} gap={"1rem"}>
            <Link href={"/"}>
                <Box flex={1} borderRadius={"0.3rem"} backgroundColor={"gray.50"} height={"20rem"} cursor={"pointer"}>
                    <Text
                        bg={"blue.400"}
                        color={"gray.50"}
                        borderRadius={"0.3rem 0.3rem 0 0"}
                        padding={"1rem"}
                        fontSize={"2xl"}
                        fontWeight={"semibold"}
                    >
                        Vouchers
                    </Text>
                </Box>
            </Link>

            <Link href={"/"}>
                <Box flex={1} borderRadius={"0.3rem"} backgroundColor={"gray.50"} height={"20rem"} cursor={"pointer"}>
                    <Text
                        bg={"blue.400"}
                        color={"gray.50"}
                        borderRadius={"0.3rem 0.3rem 0 0"}
                        padding={"1rem"}
                        fontSize={"2xl"}
                        fontWeight={"semibold"}
                    >
                        Vouchers
                    </Text>
                </Box>
            </Link>

            <Link href={"/"}>
                <Box flex={1} borderRadius={"0.3rem"} backgroundColor={"gray.50"} height={"20rem"} cursor={"pointer"}>
                    <Text
                        bg={"blue.400"}
                        color={"gray.50"}
                        borderRadius={"0.3rem 0.3rem 0 0"}
                        padding={"1rem"}
                        fontSize={"2xl"}
                        fontWeight={"semibold"}
                    >
                        Vouchers
                    </Text>
                </Box>
            </Link>
        </Flex>
    );
};

const Index = () => {
    const { user } = useAuth();

    return (
        <Container maxW="container.xl" padding={"1rem"}>
            <BlockHighlights />
        </Container>
    );
};

export default Index;
